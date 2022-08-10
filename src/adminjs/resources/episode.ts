import { ResourceOptions, FeatureType } from "adminjs";
import path from 'path'
import uploadFileFeature from '@adminjs/upload'

export const episodeResourceOptions: ResourceOptions = {
  navigation: 'Catálogo',
  editProperties: ['name', 'synopsis', 'courseId', 'order', 'uploadVideo', 'secondsLong'  ],
  filterProperties: ['name', 'synopsis', 'courseId', 'secondsLong', 'createdAt', 'updatedAt'],
  listProperties: ['id', 'name', 'courseId', 'order', 'secondsLong'],
  showProperties: ['id', 'name', 'synopsis', 'courseId', 'order', 'videoUrl', 'secondsLong', 'createdAt', 'updatedAt']
}

export const episodeResourceFeatures: FeatureType[] = [    //Crindo função de upload
  uploadFileFeature({
    provider: {
      local: {  //configurar para rodar local, para sevidor tem formas diferente.
        bucket: path.join(__dirname, '../../../uploads')
      }
    },
    properties: {
      key: 'videoUrl',
      file: 'uploadVideo'
    },
    uploadPath: (record, filename) => `videos/course-${record.get('courseId')}/${filename}`
  })
]
