import post from "../models/post.js";
export const createPost = async (req, res) => {
    const { coords, title, image } = req.body;
    if (!image) image = ""
    try {
        const p = { type: 'Point', coordinates: coords };
        const result = await post.create({ location: p, title, image })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}
export const getPosts = async (req, res) => {
    const { coords, minD, maxD } = req.body;
    const mindist = minD || 0;
    const maxDist = maxD || 20000;
    try {
        const r = await post.find({
            location:
            {
                $near:
                {
                    $geometry: { type: "Point", coordinates: coords },
                    $minDistance: mindist,
                    $maxDistance: maxDist
                }
            }
        })
        return res.status(200).json(r)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}