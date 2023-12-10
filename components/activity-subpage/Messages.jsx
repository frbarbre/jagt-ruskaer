import Heading from '../shared/Heading';
import {
  Megaphone,
  ThumbsUp,
  Pencil,
  Trash2,
  Heart,
  Check,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import Box from '../shared/Box';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import EditMessage from './EditMessage';
import NewMessage from './NewMessage';

export default function Messages({ category, messages, currentUser }) {
  const isAdmin = currentUser?.role === 'admin';
  const isCategoryAdmin = currentUser?.role === `${category}`;

  const isAuthorized = isAdmin || isCategoryAdmin;

  return (
    <>
      <div className="flex items-center justify-between pr-4">
        <Heading title={`Vigtige beskeder`} icon={<Megaphone />} />
        {isAuthorized && (
          <NewMessage category={category} currentUser={currentUser} />
        )}
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-3 mt-5 lg:min-h-[328px] pr-4 lg:h-innerMessage">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              currentUser={currentUser}
              category={category}
            />
          ))}
          <div className="hidden lg:block h-5 text-[5px] text-white">hello</div>
        </div>
      </ScrollArea>
    </>
  );
}

async function Message({ message, currentUser, category }) {
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    const date = new Date(dateString);
    const formattedDate = date
      .toLocaleDateString('da', options)
      .replace(',', '');
    const formattedDateSplit = formattedDate.split(' ');
    const time = formattedDateSplit[3].replace('.', ':');
    return `${time}, ${formattedDateSplit[0]} ${formattedDateSplit[1]} ${formattedDateSplit[2]}`;
  }

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('likes')
    .select()
    .eq('message_id', message.id)
    .eq('user_id', currentUser.id);

  return (
    <Box className="flex gap-4 justify-between items-center">
      <div className="flex gap-3 items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full ${
            data.length > 0
              ? 'bg-white'
              : message.user_id === currentUser.id
              ? 'bg-white'
              : 'bg-blue-600'
          }`}
        />
        <Avatar className="cursor-pointer self-center justify-self-end z-20 relative md:w-11 md:h-11">
          <AvatarImage src={message.author.avatar_url} />
          <AvatarFallback>
            {message.author.first_name?.[0]}
            {message.author.slast_name?.[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h2 className="text-[14px] font-semibold">
            {message.author.first_name} {message.author.last_name}
          </h2>
          <p>{message.message}</p>
          <p className="text-[12px] opacity-70 capitalize">
            {formatDate(message.updated_at)}{' '}
            {message.updated_at !== message.created_at && '(redigeret)'}
          </p>
        </div>
      </div>
      {currentUser?.id === message.author.id ? (
        <div className="flex gap-3">
          <EditMessage
            message={message}
            currentUser={currentUser}
            category={category}
          />
          <Delete message={message} />
        </div>
      ) : currentUser?.role === 'admin' ? (
        <div className="flex gap-3">
          <EditMessage
            message={message}
            currentUser={currentUser}
            category={category}
          />
          <Delete message={message} />
          <Like message={message} currentUser={currentUser} data={data} />
        </div>
      ) : (
        <Like message={message} currentUser={currentUser} data={data} />
      )}
    </Box>
  );
}

function Like({ message, currentUser, data }) {
  async function likeMessage(FormData) {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const messageId = FormData.get('messageId');
    const userId = FormData.get('userId');

    const { data } = await supabase
      .from('likes')
      .select()
      .eq('message_id', messageId)
      .eq('user_id', userId);

    if (data.length > 0) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('id', data[0].id);

      if (error) {
        console.log(error);
      }
    } else {
      const { error } = await supabase
        .from('likes')
        .insert([{ message_id: messageId, user_id: userId }]);

      if (error) {
        console.log(error);
      }
    }
  }

  return (
    <form action={likeMessage}>
      <input type="hidden" name="messageId" value={message.id} />
      <input type="hidden" name="userId" value={currentUser.id} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={`px-2.5 ${data.length > 0 && 'group'}`}
              variant="outline"
            >
              {data.length > 0 ? (
                <>
                  <Check className="w-4 h-4 group-hover:hidden" />
                  <EyeOff className="w-4 h-4 hidden group-hover:block" />
                </>
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {data.length > 0 ? <p>Marker som ulæst</p> : <p>Marker som læst</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}

function Delete({ message }) {
  async function deleteMessage(FormData) {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const messageId = FormData.get('messageId');

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', messageId);

    if (error) {
      console.log(error);
    }
  }

  return (
    <form action={deleteMessage}>
      <input type="hidden" name="messageId" value={message.id} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="px-2.5" variant="outline">
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Slet besked</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
