import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    try {
        const body = await request.json()
        
        // Input validation
        if (!body.url || !body.shorturl) {
            return Response.json({
                success: false,
                error: true,
                message: "URL and short URL are required"
            }, { status: 400 })
        }

        // URL validation
        try {
            new URL(body.url)
        } catch (e) {
            return Response.json({
                success: false,
                error: true,
                message: "Invalid URL format"
            }, { status: 400 })
        }

        const client = await clientPromise
        const db = client.db("bitlinks")
        const collection = db.collection("url")

        // Check if short url exists
        const doc = await collection.findOne({ shorturl: body.shorturl })
        if (doc) {
            return Response.json({
                success: false,
                error: true,
                message: "Short URL already exists"
            }, { status: 409 })
        }

        const result = await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl,
            createdAt: new Date()
        })

        return Response.json({
            success: true,
            error: false,
            message: 'URL Generated Successfully'
        })

    } catch (error) {
        console.error('Error:', error)
        return Response.json({
            success: false,
            error: true,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}
