export default function WeatherCard({data}: {data: any}) {
    return (
        <div
        className="bg-white p-4 rounded-lg shadow-md w-64">
            <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
            <p className="text-lg">Temperature: {data.temp}°C</p>
            <p className="text-lg">Weather: {data.description}</p>
        </div>
    )
    }