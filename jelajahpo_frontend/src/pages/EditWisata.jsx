import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditWisata() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [kategori, setKategori] = useState([]);
    const [formData, setFormData] = useState({
        nama_wisata: "",
        deskripsi: "",
        harga_tiket: "",
        id_kategori: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWisata = async () => {
            try {
                const res = await fetch(`http://localhost:5000/wisata/${id}`);
                const data = await res.json();
                setFormData(data[0]);
                setLoading(false);
            } catch (err) {
                console.error("Gagal mengambil data wisata:", err);
            }
        };

        fetchWisata();
    }, [id]);

    useEffect(() => {
        const fetchKategori = async () => {
            try {
                const res = await fetch("http://localhost:5000/kategori");
                const data = await res.json();
                setKategori(data);
            } catch (err) {
                console.error("Gagal mengambil data kategori:", err);
            }
        };

        fetchKategori();
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm("Yakin menyimpan perubahan ini?")) {
            return;
        }

        try {
            await fetch(`http://localhost:5000/wisata/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            alert("Wisata berhasil diupdate!");
            navigate("/wisata");
        } catch (err) {
            console.error("Gagal mengupdate wisata:", err);
            alert("Gagal mengupdate wisata!");
        }
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>
    }

    return (
        <div className="container mt-4">
            <h2>Edit Wisata</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nama Wisata</label>
                    <input
                        type="text"
                        name="nama_wisata"
                        value={formData.nama_wisata}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <input
                        type="text"
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga Tiket</label>
                    <input
                        type="number"
                        name="harga_tiket"
                        value={formData.harga_tiket}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-select"
                    >
                        <option value="">Pilih kategori</option>
                        {kategori.map((item) => (
                            <option
                                key={item.id_kategori}
                                value={item.id_kategori}>
                                {item.kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type="submit" className="btn btn-success me-2">
                        Simpan
                    </button>
                    <span className="mx-2"></span>
                    <button type="button" className="btn btn-danger" onClick={() => navigate("/wisata")}>
                        Batal
                    </button>
                </div>

            </form>
        </div>
    )
}