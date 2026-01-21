// api/getkey.js
export default async function handler(req, res) {
    // 1. Lấy tham số type từ request của Frontend
    const { type } = req.query;

    if (!type) {
        return res.status(400).json({ error: 'Thiếu tham số type' });
    }

    const targetUrl = `https://hackobbvip.site/GETKEY/ObbVip&type=${type}`;

    try {
        // 2. Server Vercel sẽ đi gọi hackobbvip
        // Chúng ta giả danh là một trình duyệt thật để không bị chặn
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': 'https://hackobbvip.site/',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
            }
        });

        // 3. Nếu bị chặn (403/500)
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Server đích chặn kết nối' });
        }

        const data = await response.text();

        // 4. Trả kết quả về cho Frontend
        // Cho phép Frontend gọi API này (xử lý CORS cho chính mình)
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).send(data);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}