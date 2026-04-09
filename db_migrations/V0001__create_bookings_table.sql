CREATE TABLE t_p22162371_sinyaya_buhta_projec.bookings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    dates VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);