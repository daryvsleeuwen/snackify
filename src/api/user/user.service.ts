import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {
    }

    getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                profileImage: true
            }
        });
    }
}
