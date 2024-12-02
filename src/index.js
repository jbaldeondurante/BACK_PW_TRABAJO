import app from "./app.js";
import sequelize from './config/database.js';


async function main() {
    try {
        const init = process.argv[2];

        if (init) {
            // Sincronizar la base de datos y forzar eliminación de tablas existentes si se usa el argumento `init`
            await sequelize.sync({ force: true });
            console.log("Base de datos sincronizada (forzada).");
        } else {
            // Sincronizar la base de datos sin eliminar las tablas existentes
            await sequelize.sync({ alter: true });
            console.log("Base de datos sincronizada (no forzada).");
        }

        // Iniciar el servidor
        const PORT = 4001;
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

main();
