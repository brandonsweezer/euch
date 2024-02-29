import { NotificationType } from "@/types/notification";

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID ?? '',
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY ?? '',
  secret: process.env.PUSHER_APP_SECRET ?? '',
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? '',
  useTLS: true
});

export function notificationService(channelId: string) {
    return {
        send: function (type: NotificationType, payload: any) {
            return pusher.trigger(`${channelId}`, type, payload);
        }
    }
}