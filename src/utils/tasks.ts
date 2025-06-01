interface Task {
  type: 'app' | 'youtube' | 'website' | 'subscribe';
  url: string;
  title: string;
  description: string;
  platform?: 'android' | 'all';
}

const tasks: Task[] = [
  {
    type: 'app',
    url: 'https://play.google.com/store/apps/details?id=chinese.to.englishapp',
    title: 'Install Chinese to English App',
    description: 'Install and use the app for 1 minute',
    platform: 'android'
  },
  {
    type: 'youtube',
    url: 'https://youtu.be/TKsYO3r6NLA',
    title: 'Watch Tutorial Video',
    description: 'Watch the complete tutorial video',
    platform: 'all'
  },
  {
    type: 'website',
    url: 'https://www.gentilityblog.com/unskilled-jobs-with-visa-sponsorship-in-germany/',
    title: 'Read About Job Opportunities',
    description: 'Visit and read the article for 1 minute',
    platform: 'all'
  },
  {
    type: 'subscribe',
    url: 'https://www.youtube.com/@fatherabrahamyt?sub_confirmation=1',
    title: 'Subscribe to Channel',
    description: 'Subscribe to our YouTube channel',
    platform: 'all'
  }
];

export function getDeviceType(): 'android' | 'ios' | 'desktop' {
  const userAgent = navigator.userAgent.toLowerCase();
  if (/android/i.test(userAgent)) return 'android';
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios';
  return 'desktop';
}

export function getRandomTask(): Task | null {
  const deviceType = getDeviceType();
  const availableTasks = tasks.filter(task => 
    task.platform === 'all' || (deviceType === 'android' && task.platform === 'android')
  );
  
  if (availableTasks.length === 0) return null;
  return availableTasks[Math.floor(Math.random() * availableTasks.length)];
}