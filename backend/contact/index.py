import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}


def handler(event: dict, context) -> dict:
    """Принимает заявку с формы обратной связи и отправляет письмо на почту владельца."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": "{}"}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Invalid JSON"})}

    name = (body.get("name") or "").strip()
    phone = (body.get("phone") or "").strip()
    message = (body.get("message") or "").strip()
    dates = (body.get("dates") or "").strip()

    if not name or not phone:
        return {
            "statusCode": 422,
            "headers": CORS,
            "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
        }

    schema = os.environ.get("MAIN_DB_SCHEMA", "public")
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"INSERT INTO {schema}.bookings (name, phone, dates) VALUES (%s, %s, %s)",
                (name, phone, dates or None)
            )
        conn.commit()
    finally:
        conn.close()

    to_email = os.environ.get("CONTACT_EMAIL", "")
    smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")

    if smtp_user and smtp_pass and to_email:
        dates_row = f"<tr><td style='padding:8px;font-weight:bold;color:#6b6455;'>Даты:</td><td style='padding:8px;'>{dates}</td></tr>" if dates else ""
        msg_row = f"<tr style='background:#f8f5ef;'><td style='padding:8px;font-weight:bold;color:#6b6455;'>Сообщение:</td><td style='padding:8px;'>{message}</td></tr>" if message else ""

        html_body = f"""
<h2 style="color:#1a6b7a;">Новая заявка с сайта</h2>
<table style="border-collapse:collapse;width:100%;max-width:500px;">
  <tr><td style="padding:8px;font-weight:bold;color:#6b6455;">Имя:</td><td style="padding:8px;">{name}</td></tr>
  <tr style="background:#f8f5ef;"><td style="padding:8px;font-weight:bold;color:#6b6455;">Телефон:</td><td style="padding:8px;"><a href="tel:{phone}">{phone}</a></td></tr>
  {dates_row}
  {msg_row}
</table>
<p style="margin-top:16px;color:#a89f90;font-size:13px;">Синяя Бухта · База отдыха у Японского моря</p>
"""
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новая заявка от {name} — Синяя Бухта"
        msg["From"] = smtp_user
        msg["To"] = to_email
        msg.attach(MIMEText(html_body, "html", "utf-8"))
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": CORS,
        "body": json.dumps({"ok": True, "message": "Заявка принята"}, ensure_ascii=False),
    }