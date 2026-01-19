'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'lead' | 'message' | 'request';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  metadata?: Record<string, unknown>;
}

interface UseNotificationsOptions {
  enablePolling?: boolean;
  pollingInterval?: number;
  enableSound?: boolean;
  maxNotifications?: number;
}

const NOTIFICATION_STORAGE_KEY = 'paksoft_admin_notifications';

export function useNotifications(options: UseNotificationsOptions = {}) {
  const {
    enablePolling = true,
    pollingInterval = 30000, // 30 seconds
    enableSound = true,
    maxNotifications = 50,
  } = options;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(parsed.map((n: Notification) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        })));
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }

    // Create audio element for notification sound
    if (enableSound) {
      audioRef.current = new Audio('/sounds/notification.mp3');
      audioRef.current.volume = 0.3;
    }
  }, [enableSound]);

  // Save notifications to localStorage
  useEffect(() => {
    if (typeof window === 'undefined' || notifications.length === 0) return;

    try {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving notifications:', error);
    }
  }, [notifications]);

  // Calculate unread count
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  // Add a new notification
  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    // Play sound
    if (enableSound && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }

    return newNotification;
  }, [enableSound, maxNotifications]);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Remove notification
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
    }
  }, []);

  // Poll for new notifications (simulated - would be replaced with real API)
  useEffect(() => {
    if (!enablePolling) return;

    const checkForUpdates = async () => {
      try {
        // In production, this would fetch from an API
        // const response = await fetch('/api/admin/notifications');
        // const data = await response.json();

        // Simulated check - in production, this would be real data
        setIsConnected(true);
      } catch (error) {
        console.error('Error checking for notifications:', error);
        setIsConnected(false);
      }
    };

    // Initial check
    checkForUpdates();

    // Set up polling
    const interval = setInterval(checkForUpdates, pollingInterval);

    return () => clearInterval(interval);
  }, [enablePolling, pollingInterval]);

  return {
    notifications,
    unreadCount,
    isConnected,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
  };
}

// Hook for notification preferences
export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    soundEnabled: true,
    notifyOnNewLead: true,
    notifyOnNewMessage: true,
    notifyOnNewRequest: true,
    notifyOnStatusChange: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('paksoft_notification_preferences');
    if (saved) {
      setPreferences(JSON.parse(saved));
    }
  }, []);

  const updatePreferences = useCallback((updates: Partial<typeof preferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...updates };
      if (typeof window !== 'undefined') {
        localStorage.setItem('paksoft_notification_preferences', JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  return { preferences, updatePreferences };
}
