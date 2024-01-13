import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SeatBooking.css";

const InfoPage = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const seatRows = ["A", "B", "C", "D", "E", "F"];
    const seatCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
      <div className="seat-layout">
        <div style={{color:'black'}}>------------ Pantalla del cinema ------------</div>
        {seatRows.map((row) => (
          <div key={row} className="seat-row">
            {seatCols.map((col) => {
              const seatNumber = `${row}${col}`;
              const isSelected = selectedSeats.includes(seatNumber);

              return (
                <div
                  key={seatNumber}
                  className={`seat ${isSelected ? "selected" : ""}`}
                  onClick={() => handleSeatClick(seatNumber)}
                >
                  {seatNumber}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="cinema-seat-booking">
      <h2>Please Select your seat</h2>

      {renderSeats()}
      {selectedSeats.length > 0 && (
        <div className="selected-seat">
          <p>You have selected seats: {selectedSeats.join(", ")}</p>

          <div className="payment">
            <Link to="/payment" className="payment-btn">
              Ir al carrito de compras
            </Link>
          </div>
          <Link to="/" className="go-back-link">
            Atras
          </Link>
        </div>
      )}
    </div>
  );
};

export default InfoPage;
