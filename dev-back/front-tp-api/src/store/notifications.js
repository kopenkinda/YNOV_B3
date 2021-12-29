import { reactive } from 'vue';

export const notificationPool = reactive([]);

export default function useNotifications() {
  function send(type, message) {
    const id = Date.now().toString() + Math.random().toString();
    notificationPool.push({
      id,
      type,
      message,
    });
    setTimeout(() => {
      const idx = notificationPool.findIndex((n) => n.id === id);
      if (idx !== -1) {
        notificationPool.splice(idx, 1);
      }
    }, 3000);
  }
  return send;
}
