'use client';
import { GetListBookingByCustomerAsync } from "@/app/component/api/GetListBookingByCustomerAsync";
import { BookingByCustomer } from "@/app/component/lib/Interface";
import { log } from "console";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HistoryBookingArt() {
    const [listBooking, setListBooking] = useState<BookingByCustomer[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchListBooking = async () => {
                const response = await GetListBookingByCustomerAsync(token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setListBooking(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchListBooking();
        }
    }, []);

    return (
        <div className="container mx-auto px-4">
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex flex-col">
                    {listBooking.map(booking => (
                        <Link key={booking.bookingId} className="rounded-lg p-4 mb-4 shadow-xl bg-white" href={`/customer/historyBookingArt/${booking.bookingId}`}>
                            <div className="font-bold">Creator Name: <span className="font-normal">{booking.creatorName}</span></div>
                            <div className="font-bold">Description: <span className="font-normal">{booking.description}</span></div>
                            <div className="font-bold">Booking Status: <span className="font-normal">{booking.statusName}</span></div>
                            <div className="font-bold">Booking Date: <span className="font-normal">{booking.createDateTime}</span></div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}