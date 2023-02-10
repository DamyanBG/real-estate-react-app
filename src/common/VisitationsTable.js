export default function VisitationsTable({ visitations }) {
    return (
        <>
            <p>Visitations</p>
            <table>
                <thead>
                    <th>Start hour</th>
                    <th>End hour</th>
                    <th>Address</th>
                </thead>
                <tbody>
                    {visitations.map((v) => (
                        <tr key={v._id}>
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