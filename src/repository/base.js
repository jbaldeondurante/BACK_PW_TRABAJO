class RepositoryBase {
    constructor(model) {
        this.model = model;
    }

    // Obtener todos los registros
    async findAll() {
        try {
            return await this.model.findAll();
        } catch (error) {
            console.error("Error al obtener todos los registros:", error);
            throw error;
        }
    }

    // Crear un nuevo registro
    async create(entity) {
        try {
            return await this.model.create(entity);
        } catch (error) {
            console.error("Error al crear el registro:", error);
            throw error;
        }
    }

    // Obtener un registro por su ID
    async findOne(id) {
        try {
            return await this.model.findOne({ where: { id } });
        } catch (error) {
            console.error(`Error al obtener el registro con ID ${id}:`, error);
            throw error;
        }
    }

    // Actualizar un registro existente
    async update(entity) {
        try {
            const { id } = entity;
            const [updatedRows] = await this.model.update(entity, { where: { id } });

            if (updatedRows === 0) {
                throw new Error(`No se encontró el registro con ID ${id} para actualizar.`);
            }

            return await this.findOne(id); // Retorna el registro actualizado
        } catch (error) {
            console.error("Error al actualizar el registro:", error);
            throw error;
        }
    }

    // Eliminar un registro por su ID
    async remove(id) {
        try {
            const deletedRows = await this.model.destroy({ where: { id } });

            if (deletedRows === 0) {
                throw new Error(`No se encontró el registro con ID ${id} para eliminar.`);
            }

            return { message: `Registro con ID ${id} eliminado correctamente.` };
        } catch (error) {
            console.error(`Error al eliminar el registro con ID ${id}:`, error);
            throw error;
        }
    }
}

export default RepositoryBase;
