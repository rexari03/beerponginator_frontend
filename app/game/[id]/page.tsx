import NavBar from "@/components/navbar";

interface Params {
    id: string;
}

export default function Page({params}: { params: Params }) {

    return (
        <>
            <NavBar/>
            <div>
                <h1>Willkommen beim Turnier</h1>
                <p>TurnierID: {params.id}</p>
            </div>
        </>
    );
}