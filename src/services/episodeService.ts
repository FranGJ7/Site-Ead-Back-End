import { Response } from "express";
import path from "path";
import fs from "fs";


export const episodesService  = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined)=>{
        const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
        const fileStat = fs.statSync(filePath)

       

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-') // pegando trecho do video

            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, { start, end }) //  streaming de leitura

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranger': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(206, head)   //206 conteúdo parcial

            file.pipe(res)

        }else{
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(200, head)     //enviando arquivo inteiro (Menos eficiente)

            fs.createReadStream(filePath).pipe(res)

        }
    }

}