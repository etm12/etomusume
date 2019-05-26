declare namespace Twitch {
  declare interface IComment {
    _id: string;
    created_at: DateTimeString;
    updated_at: DateTimeString;
    channel_id: string;
    content_type: ContentType;
    content_id: string;
    content_offset_seconds: number;
    commenter: ICommenter;
    source: CommentSource;
    state: CommentState;
    message: IMessage;
    more_replies: boolean;
  }

  interface IEmoticon {
    emoticon_id: string;
    emoticon_set_id: string;
  }

  interface IFragment {
    text: string;
    emoticon?: IEmoticon;
  }

  interface IUserBadge {
    _id: string;
    version: string;
  }

  interface IMessage {
    body: string;
    emoticons: Array<{
      _id: string;
      begin: number;
      end: number;
    }>;
    fragments: Array<IFragment>;
    is_action: boolean;
    user_badges: Array<IUserBadge>;
    user_color: string;
    user_notice_params: {};
  }

  declare interface ICommenter {
    display_name: string;
    _id: string;
    name: string;
    type: CommenterType;
    bio: string;
    created_at: DateTimeString;
    updated_at: DateTimeString;
    logo: string;
  }

  type DateTimeString = string;

  type CommenterType = 'user';

  type ContentType = 'video';

  type CommentSource = 'chat';

  type CommentState = 'published';
}
