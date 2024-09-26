import QrCodeGenerator from "@/components/qrCodeGenerator";
import {useTournament} from "@/context/tournamentContext";

export default function Home() {
    return (
        <div>
            <h1 className="text-center display-1">BeerPonginator</h1>
            <p>{useTournament().tournamentId}</p>
            <QrCodeGenerator/>
        </div>
    );
}