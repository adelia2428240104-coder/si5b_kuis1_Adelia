const {
    getAllPhotoPackages,
    getPhotoPackageById,
    getPhotoPackagesByJenis,
    addPhotoPackage,
    updatePhotoPackage,
    deletePhotoPackage
} = require("../models/photoPackageModel");

const createError = (message, status) => {
    const error = new Error(message);
    error.status = status;
    return error;
};

// GET semua paket foto
const getAll = (req, res) => {
    const { jenis } = req.query;

    if (jenis) {
        return res.json({
            status: "success",
            data: getPhotoPackagesByJenis(jenis)
        });
    }

    res.json({
        status: "success",
        data: getAllPhotoPackages()
    });
};

// GET paket foto berdasarkan ID
const getById = (req, res, next) => {
    const id = parseInt(req.params.id);

    const photoPackage = getPhotoPackageById(id);

    if (!photoPackage) {
        return next(createError("Paket foto tidak ditemukan", 404));
    }

    res.json({
        status: "success",
        data: photoPackage
    });
};

// POST tambah paket foto
const create = (req, res, next) => {
    const { namaPaket, jenis, jumlahFoto, durasiJam, harga } = req.body;

    if (!namaPaket || !jenis || jumlahFoto === undefined || harga === undefined) {
        return next(createError("Data paket foto tidak lengkap", 400));
    }

    if (!["wisuda", "prewedding", "produk"].includes(jenis)) {
        return next(createError("Jenis paket tidak valid", 400));
    }

    const newPhotoPackage = addPhotoPackage({
        namaPaket,
        jenis,
        jumlahFoto,
        durasiJam,
        harga
    });

    res.status(201).json({
        status: "success",
        message: "Paket foto berhasil ditambahkan",
        data: newPhotoPackage
    });
};

// PUT ubah paket foto
const update = (req, res, next) => {
    const id = parseInt(req.params.id);
    const { namaPaket, jenis, jumlahFoto, durasiJam, harga } = req.body;

    if (!namaPaket || !jenis || jumlahFoto === undefined || harga === undefined) {
        return next(createError("Data paket foto tidak lengkap", 400));
    }

    if (!["wisuda", "prewedding", "produk"].includes(jenis)) {
        return next(createError("Jenis paket tidak valid", 400));
    }

    const updatedPhotoPackage = updatePhotoPackage(id, {
        namaPaket,
        jenis,
        jumlahFoto,
        durasiJam,
        harga
    });

    if (!updatedPhotoPackage) {
        return next(createError("Paket foto tidak ditemukan", 404));
    }

    res.json({
        status: "success",
        message: "Paket foto berhasil diubah",
        data: updatedPhotoPackage
    });
};

// DELETE paket foto
const remove = (req, res, next) => {
    const id = parseInt(req.params.id);

    const deletedPhotoPackage = deletePhotoPackage(id);

    if (!deletedPhotoPackage) {
        return next(createError("Paket foto tidak ditemukan", 404));
    }

    res.status(204).send();
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};