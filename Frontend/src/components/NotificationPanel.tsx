import { useNotifications } from '@/contexts/NotificationContext';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export function NotificationPanel() {
  const { notifications, removeNotification, clearNotifications } = useNotifications();

  return (
    <div className="fixed top-4 right-4 w-80 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg ${
            notification.type === 'success'
              ? 'bg-green-100 border border-green-200'
              : notification.type === 'error'
              ? 'bg-red-100 border border-red-200'
              : notification.type === 'warning'
              ? 'bg-yellow-100 border border-yellow-200'
              : 'bg-blue-100 border border-blue-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-2">
              <Bell className="h-5 w-5 mt-1" />
              <div>
                <p className="font-medium">{notification.message}</p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
} 