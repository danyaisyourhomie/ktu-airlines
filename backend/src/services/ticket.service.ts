import { BotInviteKeyboard } from "@common/bot.keyboards";
import { INVITE_TEXT } from "@common/bot.phrases";
import { ShareableUserDto, UserDto } from "@dtos/user.dto";
import { Injectable } from "@nestjs/common";
import { TicketRepository } from "repositories/ticket.repository";
import { BotService } from "./bot.service";

@Injectable()
export class TicketService {
    constructor(
        private ticketRepository: TicketRepository,
        private botService: BotService
    ) { }

    async getAll() {
        return this.ticketRepository.getAll()
    }

    async getTicketByUserId(userId: number) {
        return this.ticketRepository.getBy("userId", userId);
    }

    async inviteUser(user: ShareableUserDto) {
        const ticket = await this.ticketRepository.getBy("userId", user.id);

        if (ticket) {
            await this.ticketRepository.update({ ...ticket, status: "pending" });
        } else {
            await this.ticketRepository.save({ status: "pending", userId: user.id });
        }

        return this.botService.sendMessage({ user: user.vkId, message: INVITE_TEXT, keyboard: BotInviteKeyboard });
    }
}
