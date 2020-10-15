import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';
import Orphanage from '../models/Orphanage';

class OrphanageController {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.status(200).json(orphanageView.renderMany(orphanages));
    }

    async getById(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOneOrFail({
            relations: ['images'],
            where: { id }
        });

        return response.status(200).json(orphanageView.render(orphanage));
    }

    async uploadImages(request: Request, response: Response) {
        const { id } = request.params;
        const imagesArray = request.files as Express.Multer.File[];

        const images = imagesArray.map(image => {
            return { path: image.filename };
        });

        const orphanagesRepository = getRepository(Orphanage);

        const findOrphanage = await orphanagesRepository.findOne({
            where: { id }
        });

        if(!findOrphanage) 
            return response.status(400).json({ errorMessage: 'Orfanato não encontrado' });

        const upload = orphanagesRepository.create({
            name: findOrphanage.name,
            latitude: findOrphanage.latitude,
            longitude: findOrphanage.longitude,
            about: findOrphanage.about,
            instructions: findOrphanage.instructions,
            opening_hours: findOrphanage.opening_hours,
            open_on_weekends: findOrphanage.open_on_weekends,
            images
        });

        await orphanagesRepository.save(upload);
        
        return response.status(200).json(upload);
    }

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
        const imagesArray = request.files as Express.Multer.File[];

        const images = imagesArray.map(image => {
            return { path: image.filename };
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required().max(300),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required(),
                })
            )
        });

        await schema.validate(data), {
            abortEarly: false
        };

        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = orphanagesRepository.create(data);
        await orphanagesRepository.save(orphanage);

        return response.status(201).json(orphanage);
    }
}

export default new OrphanageController();
