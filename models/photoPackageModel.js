let photoPackages = [
    {
        id: 1,
        namaPaket: "Wisuda Keluarga",
        jenis: "wisuda",
        jumlahFoto: 20,
        durasiJam: 1,
        harga: 450000
    },
    {
        id: 2,
        namaPaket: "Prewedding Romantic",
        jenis: "prewedding",
        jumlahFoto: 50,
        durasiJam: 3,
        harga: 1500000
    },
    {
        id: 3,
        namaPaket: "Foto Produk UMKM",
        jenis: "produk",
        jumlahFoto: 15,
        durasiJam: 2,
        harga: 600000
    }
];

let nextId = 4;

const getAllPhotoPackages = () => {
    return photoPackages;
};

const getPhotoPackageById = (id) => {
    return photoPackages.find((item) => item.id === id);
};

const getPhotoPackagesByJenis = (jenis) => {
    return photoPackages.filter((item) => item.jenis === jenis);
};

const addPhotoPackage = (data) => {
    const newPhotoPackage = {
        id: nextId++,
        ...data
    };

    photoPackages.push(newPhotoPackage);

    return newPhotoPackage;
};

const updatePhotoPackage = (id, data) => {
    const index = photoPackages.findIndex((item) => item.id === id);

    if (index === -1) {
        return null;
    }

    photoPackages[index] = {
        ...photoPackages[index],
        ...data,
        id
    };

    return photoPackages[index];
};

const deletePhotoPackage = (id) => {
    const index = photoPackages.findIndex((item) => item.id === id);

    if (index === -1) {
        return null;
    }

    return photoPackages.splice(index, 1)[0];
};

module.exports = {
    getAllPhotoPackages,
    getPhotoPackageById,
    getPhotoPackagesByJenis,
    addPhotoPackage,
    updatePhotoPackage,
    deletePhotoPackage
};