import clientPromise from "@/lib/mongodb"

export async function POST(request) {
    let client;
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

        // Validate shorturl format (only allow alphanumeric and hyphens)
        if (!/^[a-zA-Z0-9-]+$/.test(body.shorturl)) {
            return Response.json({
                success: false,
                error: true,
                message: "Short URL can only contain letters, numbers, and hyphens"
            }, { status: 400 })
        }

        client = await clientPromise
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

        await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl,
            createdAt: new Date()
        })

        return Response.json({
            success: true,
            error: false,
            message: 'URL Generated Successfully',
            shortUrl: `${process.env.NEXT_PUBLIC_HOST}/${body.shorturl}`
        })

    } catch (error) {
        console.error('Error:', error)
        return Response.json({
            success: false,
            error: true,
            message: error.message || "Internal Server Error"
        }, { status: 500 })
    }
}
