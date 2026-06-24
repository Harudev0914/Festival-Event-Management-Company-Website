import { Injectable } from '@nestjs/common';
import { Announcement } from '@repo/db';

@Injectable()
export class AnnouncementsService {
  async findAll() {
    return await Announcement.find({}).sort({ createdAt: -1 });
  }

  async create(data: any) {
    const announcement = new Announcement(data);
    return await announcement.save();
  }

  async update(id: string, data: any) {
    return await Announcement.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string) {
    return await Announcement.findByIdAndDelete(id);
  }
}
