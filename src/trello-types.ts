// src/trello-types.ts

declare global {
    interface Window {
      TrelloPowerUp: {
        initialize: (handlers: PowerUpHandlers) => void;
        iframe: () => PowerUp.IFrame;
      };
    }
  }
  
  // For backward compatibility
  type TrelloPowerUpIframe = PowerUp.IFrame;
  
  export interface PowerUpHandlers {
    'card-badges'?: (t: PowerUp.IFrame) => Promise<Badge[]>;
    'card-buttons'?: (t: PowerUp.IFrame) => CardButton[] | Promise<CardButton[]>;
    'card-back-section'?: (t: PowerUp.IFrame) => CardBackSection | Promise<CardBackSection>;
    'show-settings'?: (t: PowerUp.IFrame) => void | Promise<void>;
    'authorization-status'?: (t: PowerUp.IFrame) => Promise<AuthorizationStatus>;
    'attachment-sections'?: (t: PowerUp.IFrame) => Promise<AttachmentSection[]>;
    'board-buttons'?: (t: PowerUp.IFrame) => BoardButton[] | Promise<BoardButton[]>;
    'card-detail-badges'?: (t: PowerUp.IFrame) => Promise<Badge[]>;
    'card-from-url'?: (t: PowerUp.IFrame) => Promise<CardFromUrlResponse>;
    'format-url'?: (t: PowerUp.IFrame) => Promise<FormatUrlResponse>;
    'list-actions'?: (t: PowerUp.IFrame) => ListAction[] | Promise<ListAction[]>;
    'list-sorters'?: (t: PowerUp.IFrame) => ListSorter[] | Promise<ListSorter[]>;
    'on-enable'?: (t: PowerUp.IFrame) => void | Promise<void>;
    'on-disable'?: (t: PowerUp.IFrame) => void | Promise<void>;
    'remove-data'?: (t: PowerUp.IFrame) => void | Promise<void>;
  }
  
  export namespace PowerUp {
    export interface IFrame {
      arg: <T = any>(name: string) => T;
      get: <T = any>(
        scope: Scope | string,
        visibility: Visibility | string,
        key?: string,
        defaultValue?: T
      ) => Promise<T>;
      set: (scope: Scope | string, visibility: Visibility | string, key: string, value: any) => Promise<void>;
      remove: (scope: Scope | string, visibility: Visibility | string, key: string) => Promise<void>;
      card: <T extends CardProperties = CardProperties>(field: string | string[]) => Promise<T>;
      cards: <T extends CardProperties = CardProperties>(field: string | string[]) => Promise<T[]>;
      list: <T extends ListProperties = ListProperties>(field: string | string[]) => Promise<T>;
      lists: <T extends ListProperties = ListProperties>(field: string | string[]) => Promise<T[]>;
      member: <T extends MemberProperties = MemberProperties>(field: string | string[]) => Promise<T>;
      board: <T extends BoardProperties = BoardProperties>(field: string | string[]) => Promise<T>;
      organization: <T extends OrganizationProperties = OrganizationProperties>(
        field: string | string[]
      ) => Promise<T>;
      popup: (options: PopupOptions) => Promise<void>;
      closePopup: () => void;
      alert: (options: AlertOptions) => Promise<void>;
      hideAlert: () => void;
      modal: (options: ModalOptions) => Promise<void>;
      closeModal: () => void;
      updateModal: (options: Partial<ModalOptions>) => void;
      sizeTo: (elementOrSelector: string | HTMLElement) => void;
      authorize: (authUrl: string) => Promise<string>;
      getRestApi: () => Promise<Rest.Api>;
      jwt: () => Promise<string>;
      localizeKey: (key: string, data?: { [key: string]: string }) => string;
      localizeKeys: (keys: string[]) => string[];
    }
  
    export type Scope = 'board' | 'card' | 'member' | 'organization';
    export type Visibility = 'shared' | 'private';
  }
  
  export namespace Rest {
    export interface Api {
      get: <T = any>(path: string, params?: object) => Promise<T>;
      post: <T = any>(path: string, data?: object) => Promise<T>;
      put: <T = any>(path: string, data?: object) => Promise<T>;
      delete: <T = any>(path: string) => Promise<T>;
      authorize: (opts: AuthOptions) => Promise<string>;
      isAuthorized: () => boolean;
      clearToken: () => void;
    }
  
    export interface AuthOptions {
      type?: 'redirect';
      name?: string;
      persist?: boolean;
      interactive?: boolean;
      scope?: {
        read?: boolean;
        write?: boolean;
        account?: boolean;
      };
      expiration?: 'never' | '1hour' | '1day' | '30days';
    }
  }
  
  export interface CardProperties {
    id: string;
    name: string;
    desc: string;
    due: string | null;
    closed: boolean;
    cover: any;
    attachments: any[];
    members: any[];
    labels: any[];
    badges: any;
    customFieldItems: any[];
  }
  
  export interface ListProperties {
    id: string;
    name: string;
    cards: CardProperties[];
  }
  
  export interface BoardProperties {
    id: string;
    name: string;
    cards: CardProperties[];
    lists: ListProperties[];
    members: MemberProperties[];
  }
  
  export interface MemberProperties {
    id: string;
    username: string;
    fullName: string;
    avatar: string | null;
  }
  
  export interface OrganizationProperties {
    id: string;
    name: string;
    displayName: string;
  }
  
  export interface Badge {
    text?: string;
    color?: 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'purple' | 'pink' | 'sky' | 'lime' | 'light-gray';
    icon?: string;
    callback?: (t: PowerUp.IFrame) => void;
    href?: string;
    target?: string;
  }
  
  export interface CardButton {
    icon: string;
    text: string;
    callback: (t: PowerUp.IFrame) => void;
    condition?: 'edit' | 'signedIn' | 'signedOut' | 'always';
    target?: string;
  }
  
  export interface CardBackSection {
    title: string;
    icon: string;
    content: {
      type: 'iframe' | 'callback';
      url?: string;
      height?: number;
      callback?: (t: PowerUp.IFrame) => void;
    };
  }
  
  export interface PopupOptions {
    title: string;
    url?: string;
    height?: number;
    args?: any;
    callback?: (t: PowerUp.IFrame) => void;
    items?: PopupItem[];
    search?: {
      count?: number;
      placeholder?: string;
      empty?: string;
      searching?: string;
      debounce?: number;
    };
  }
  
  export interface PopupItem {
    text: string;
    callback: (t: PowerUp.IFrame) => void;
  }
  
  export interface AlertOptions {
    message: string;
    duration?: number;
    display?: 'error' | 'warning' | 'info' | 'success';
  }
  
  export interface ModalOptions {
    url: string;
    accentColor?: string;
    height?: number;
    fullscreen?: boolean;
    callback?: () => void;
    title?: string;
    actions?: {
      text: string;
      callback: (t: PowerUp.IFrame) => void;
    }[];
  }
  
  export interface AuthorizationStatus {
    authorized: boolean;
  }
  
  export interface AttachmentSection {
    claimed: boolean;
    icon: string;
    content: {
      type: string;
      url?: string;
      height?: number;
    };
  }
  
  export interface BoardButton {
    icon: {
      dark: string;
      light: string;
    };
    text: string;
    condition?: 'edit' | 'signedIn' | 'signedOut' | 'always';
    callback: (t: PowerUp.IFrame) => void;
  }
  
  export interface CardFromUrlResponse {
    name: string;
    desc?: string;
  }
  
  export interface FormatUrlResponse {
    icon: string;
    text: string;
    subtext?: string;
    image?: {
      url: string;
      size: 'contain' | 'original' | 'cover';
    };
    actions?: CardButton[];
    thumbnail?: string;
  }
  
  export interface ListAction {
    text: string;
    callback: (t: PowerUp.IFrame) => void;
  }
  
  export interface ListSorter {
    text: string;
    callback: (t: PowerUp.IFrame, options: any) => Promise<void>;
  }