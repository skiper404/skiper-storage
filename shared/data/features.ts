import { Cloud, CreditCard, FolderOpen, Shield, ShieldBan, Users } from 'lucide-vue-next'

export const features = [
  {
    key: 'auth',
    icon: Shield,
    color: 'text-violet-500'
  },
  {
    key: 'storage',
    icon: Cloud,
    color: 'text-sky-500'
  },
  {
    key: 'files',
    icon: FolderOpen,
    color: 'text-blue-600'
  },
  {
    key: 'roles',
    icon: Users,
    color: 'text-blue-500'
  },
  {
    key: 'moderation',
    icon: ShieldBan,
    color: 'text-violet-400'
  },
  {
    key: 'subscriptions',
    icon: CreditCard,
    color: 'text-sky-500'
  }
]
