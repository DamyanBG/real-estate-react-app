export default function VisitationsTable({ visitations }) {
    return (
        <>
            <p>Visitations</p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Start hour</th>
                        <th>End hour</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {visitations.map((v) => (
                        <tr key={v.id}>
                            <td>{v.date}</td>
                            <td>{v.start_hour}</td>
                            <td>{v.end_hour}</td>
                            <td>{v.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}