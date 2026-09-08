import z, { object } from 'zod'

    // utilizamos la libreria zod para validar los datos
    // aqui vamos a validar solo el objeto que entra de la rquest y hacer su schema (esquema)
    // pero se puede hacer un schema de la request, del input, etc 

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a String',
        required_error: 'Movie title is required'
    }), 
    year: z.number().int().min(1900).max(2027),
    director: z.string(),
    duration: z.number().int().positive(), 
    poster: z.string().endsWith('.jpg'), 
    genre: z.array(
        z.enum([
            "Action",
            "Adventure",
            "Animation",
            "Biography",
            "Crime",
            "Drama",
            "Fantasy",
            "Romance",
            "Sci-Fi"
        ])
    ),
    rate: z.number().min(0).max(10).default(0) // <-- Campo pcional con valor por defecto
})

export function validateSchema (object) {
    return movieSchema.safeParse(object)
    // el safeParse te da un objeto result que te dice si hay un error o si hay datos
    // esto es para no hacer un try-catch con el simple parse 
}

// para hacer una verificacion parcial del objeto 
export function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object)
    // esto hace que todos los parametros del objeto sean opcionales 
    // si esta el parametro, lo validas 
}