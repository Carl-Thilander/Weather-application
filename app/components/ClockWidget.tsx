"use client";
import { useEffect, useState } from "react";

export default function ClockWidget() {
    const [time, setTime] = useState("");

    useEffect (() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            setTime(`${hours}:${minutes}:${seconds}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);
    return (
    <div className="text-4xl font-mono font-bold text-slate-800" data-cy="clock-widget">
      {time}
    </div>
  );
}