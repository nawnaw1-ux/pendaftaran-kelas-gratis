document.addEventListener("DOMContentLoaded", function () {
    // 1. Inisialisasi Dataset Awal jika localStorage masih kosong
    
    /*MEMANGGIL FUNCTION DATASET YANG ADA*/
    /*initDataset();*/
    /*MENAMPILKAN DATASET YANG SUDAH DIPANGGIL FUNCTION TADI*/
    tampilData();


    /*FUNCTION UNTUK INPUT DATA SISWA*/
    document.getElementById("formPendaftaran").addEventListener("submit", function (e) {
        e.preventDefault();

        let id = document.getElementById("id").value;
        let nama = document.getElementById("nama").value.trim();
        let email = document.getElementById("email").value.trim();
        let no_hp = document.getElementById("no_hp").value.trim();
        let kelas = document.getElementById("kelas").value;
        let metode = document.getElementById("metode").value;

        if (nama === "" || email === "" || no_hp === "" || kelas === "" || metode === "") {
            alert("Semua field wajib diisi!");
            return;
        }

        let data = JSON.parse(localStorage.getItem("pendaftaran")) || [];

        let newData;
        if (id === "") {
            newData = {
                id: Date.now(),
                nama: nama,
                email: email,
                no_hp: no_hp,
                kelas: kelas,
                metode: metode
            };
            data.push(newData);
        } else {
            newData = {
                id: id,
                nama: nama,
                email: email,
                no_hp: no_hp,
                kelas: kelas,
                metode: metode
            };
            data = data.map(item => (item.id == id ? newData : item));
        }

        localStorage.setItem("pendaftaran", JSON.stringify(data));
        
        // Update Tampilan
        showInCard(newData); // Tampilkan di kartu kanan
        tampilData();        // Update tabel bawah
        
        document.getElementById("formPendaftaran").reset();
        document.getElementById("id").value = "";
    });
});

/*FUNCTION MEMBUAT DATA SET*/
/*function initDataset() {
    if (!localStorage.getItem("pendaftaran")) {
        const dummyData = [
            { id: 1, nama: "Liman Sanjaya", email: "liman@example.com", no_hp: "0812345678", kelas: "SD 6", metode: "Online" },
            { id: 2, nama: "Budi Santoso", email: "budi@mail.com", no_hp: "0812999000", kelas: "SMP 7", metode: "Offline" },
            { id: 3, nama: "Siti Aminah", email: "siti@web.id", no_hp: "0856777888", kelas: "SD 4", metode: "Online" },
            { id: 4, nama: "Andi Wijaya", email: "andi@gmail.com", no_hp: "0811222333", kelas: "SMP 9", metode: "Offline" },
            { id: 5, nama: "Rina Rose", email: "rina@hot.com", no_hp: "0898887776", kelas: "SD 5", metode: "Online" }
        ];
        localStorage.setItem("pendaftaran", JSON.stringify(dummyData));
    }
}*/

/*FUNCTION SHOW DATA YANG KELUAR SETELAH SAYA ISI*/
function showInCard(item) {
    const cardContent = document.getElementById("cardContent");
    cardContent.innerHTML = `
        <div class="card-detail">
            <p><strong>NAMA LENGKAP:</strong><br> ${item.nama}</p>
            <p><strong>EMAIL:</strong><br> ${item.email}</p>
            <p><strong>KELAS:</strong><br> ${item.kelas}</p>
            <p><strong>METODE:</strong><br> ${item.metode}</p>
            <div class="card-buttons">
                <button class="btn-edit-card" onclick="editData(${item.id})">EDIT</button>
                <button class="btn-hapus-card" onclick="hapusData(${item.id})">HAPUS</button>
            </div>
        </div>
    `;
}



/*FUNCTION SHOW DATA YANG SESUAI DATASET DAN DATA YANG SAYA INPUT*/
function tampilData() {
    let data = JSON.parse(localStorage.getItem("pendaftaran")) || [];
    let tbody = document.querySelector("#tabelData tbody");
    tbody.innerHTML = "";

    data.forEach(function (item) {
        let row = `
            <tr>
                <td>${item.nama}</td>
                <td>${item.email}</td>
                <td>${item.no_hp}</td>
                <td>${item.kelas}</td>
                <td><span class="${item.metode.toLowerCase()}">${item.metode}</span></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}


/*FUNCTION EDIT DATA YANG SESUAI DENGAN DATA SAYA*/
function editData(id) {
    let data = JSON.parse(localStorage.getItem("pendaftaran"));
    let item = data.find(d => d.id == id);

    document.getElementById("id").value = item.id;
    document.getElementById("nama").value = item.nama;
    document.getElementById("email").value = item.email;
    document.getElementById("no_hp").value = item.no_hp;
    document.getElementById("kelas").value = item.kelas;
    document.getElementById("metode").value = item.metode;
    
    // Scroll ke atas agar user tahu form sedang dalam mode edit
    window.scrollTo({top: 0, behavior: 'smooth'});
}


/*FUNCTION HAPUS DATA YANG SESUAI DENGAN DATA SAYA*/
function hapusData(id) {
    if(confirm("Hapus data ini?")) {
        let data = JSON.parse(localStorage.getItem("pendaftaran"));
        data = data.filter(item => item.id != id);
        localStorage.setItem("pendaftaran", JSON.stringify(data));
        
        // Kosongkan kartu jika data yang dihapus sedang tampil di sana
        document.getElementById("cardContent").innerHTML = '<p class="placeholder-text">Data telah dihapus.</p>';
        
        tampilData();
    }
}