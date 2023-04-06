"use client";
import * as React from 'react';

import { IconButton, ListDivider, ListItem, ListItemDecorator, Menu, MenuItem, Sheet, Stack, Switch, Typography, useColorScheme } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import { LocaleId, Locales,ChatModelId, ChatModels, SystemPurposeId, SystemPurposes } from '@/lib/data';
import { Link } from '@/components/util/Link';
import { StyledDropdown } from '@/components/util/StyledDropdown';
import { foolsMode } from '@/lib/theme';
import { shallow } from 'zustand/shallow';
import { useActiveConfiguration, useChatStore, useConversationNames } from '@/lib/store-chats';
import { useSettingsStore } from '@/lib/store-settings';

import { useTranslation } from 'next-i18next';

import {  useRouter } from "next/router";
/**
 * FIXME - TEMPORARY - placeholder for a proper Pages Drawer
 */
function PagesMenu(props: { pagesMenuAnchor: HTMLElement | null, onClose: () => void, onClearConversation: (e: React.MouseEvent, conversationId: string) => void }) {

  // external state
  const setActiveConversation = useChatStore(state => state.setActiveConversationId);
  const conversationNames: { id: string; name: string, systemPurposeId: SystemPurposeId }[] = useConversationNames();

  const handleConversationClicked = (conversationId: string) => setActiveConversation(conversationId);

  const { t } = useTranslation("common");
  return <Menu
  variant='plain' color='neutral' size='lg' placement='bottom-start' sx={{ minWidth: 280 }}
  open={!!props.pagesMenuAnchor} anchorEl={props.pagesMenuAnchor} onClose={props.onClose}
  disablePortal={false}>

  <ListItem>
    <Typography level='body2'>
      {t('applicationBar.activeChats')}
    </Typography>
  </ListItem>

  {conversationNames.map((conversation) => (
    <MenuItem
      key={'c-id-' + conversation.id}
      onClick={() => handleConversationClicked(conversation.id)}
    >

      <ListItemDecorator>
        {SystemPurposes[conversation.systemPurposeId]?.symbol || ''}
      </ListItemDecorator>

      <Typography sx={{ mr: 2 }}>
        {conversation.name}
      </Typography>

      <IconButton
        variant='soft' color='neutral' sx={{ ml: 'auto' }}
        onClick={e => props.onClearConversation(e, conversation.id)}>
        <DeleteOutlineIcon />
      </IconButton>

    </MenuItem>
  ))}

  <MenuItem disabled={true}>
    <ListItemDecorator><AddIcon /></ListItemDecorator>
    <Typography sx={{ opacity: 0.5 }}>
      {t('applicationBar.newChat')}
      {/* We need stable Chat and Message IDs, and one final review to the data structure of Conversation for future-proofing */}
    </Typography>
  </MenuItem>


  <ListItem>
    <Typography level='body2'>
      {t('applicationBar.scratchpad')}
    </Typography>
  </ListItem>

  <MenuItem>
    <ListItemDecorator />
    <Typography sx={{ opacity: 0.5 }}>
      {t('applicationBar.feature')} <Link href='' target='_blank'>#17</Link>
    </Typography>
  </MenuItem>

</Menu>;
}


/**
 * The top bar of the application, with the model and purpose selection, and menu/settings icons
 */
export function ApplicationBar({ onClearConversation, onDownloadConversationJSON, onPublishConversation, onShowSettings, sx }: {
  onClearConversation: (conversationId: (string | null)) => void;
  onDownloadConversationJSON: (conversationId: (string | null)) => void;
  onPublishConversation: (conversationId: (string | null)) => void;
  onShowSettings: () => void;
  sx?: SxProps
}) {
  // state
  const [pagesMenuAnchor, setPagesMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [actionsMenuAnchor, setActionsMenuAnchor] = React.useState<HTMLElement | null>(null);

  // external state
  const { mode: colorMode, setMode: setColorMode } = useColorScheme();
  const { freeScroll, setFreeScroll, showSystemMessages, setShowSystemMessages } = useSettingsStore(state => ({
    freeScroll: state.freeScroll, setFreeScroll: state.setFreeScroll,
    showSystemMessages: state.showSystemMessages, setShowSystemMessages: state.setShowSystemMessages,
  }), shallow);
  const { localeId, setLocaleId, chatModelId, setChatModelId, setSystemPurposeId, systemPurposeId } = useActiveConfiguration();

  const { t } = useTranslation('common');
  const router = useRouter();

  const handleChatModelChange = (event: any, value: ChatModelId | null) => value && setChatModelId(value);

  const handleSystemPurposeChange = (event: any, value: SystemPurposeId | null) => value && setSystemPurposeId(value);

  const handleLocaleChange = (event: any, value: LocaleId | null) => {
    value && setLocaleId(value)


    const currentPath = router.asPath.replace(new RegExp(`^/${router.locale}`), '');

    const newLocale = `/${value?.split('-')[0]}`

      // Navigate to the new URL with the new locale
    router.push(currentPath, `${newLocale}${currentPath}`, { locale: false });
  


  };

  const closePagesMenu = () => setPagesMenuAnchor(null);


  const closeActionsMenu = () => setActionsMenuAnchor(null);

  const handleDarkModeToggle = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');

  const handleScrollModeToggle = () => setFreeScroll(!freeScroll);

  const handleSystemMessagesToggle = () => setShowSystemMessages(!showSystemMessages);

  const handleActionShowSettings = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShowSettings();
    closeActionsMenu();
  };

  const handleActionDownloadChatJson = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownloadConversationJSON(null);
  };

  const handleActionPublishChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPublishConversation(null);
  };

  const handleActionClearConversation = (e: React.MouseEvent, id: string | null) => {
    e.stopPropagation();
    onClearConversation(id || null);
  };


  return <>

    {/* Top Bar with 2 icons and Model/Purpose selectors */}
    <Sheet
      variant='solid' color='neutral' invertedColors
      sx={{
        p: 1,
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        ...(sx || {}),
      }}>

      <IconButton variant='plain' onClick={event => setPagesMenuAnchor(event.currentTarget)}>
        {foolsMode ? <LunchDiningIcon /> : <MenuIcon />}
      </IconButton>

      <Stack direction='row' sx={{ my: 'auto' }}>

        <StyledDropdown items={ChatModels} value={chatModelId} onChange={handleChatModelChange} />

        <StyledDropdown items={SystemPurposes} value={systemPurposeId} onChange={handleSystemPurposeChange} />

        <StyledDropdown items={Locales} value={localeId} onChange={handleLocaleChange} />

      </Stack>

      <IconButton variant='plain' onClick={event => setActionsMenuAnchor(event.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
    </Sheet>


    {/* Left menu */}
    {<PagesMenu
      pagesMenuAnchor={pagesMenuAnchor}
      onClose={closePagesMenu}
      onClearConversation={handleActionClearConversation}
    />}


    {/* Right menu */}
    <Menu
      variant='plain' color='neutral' size='lg' placement='bottom-end' sx={{ minWidth: 280 }}
      open={!!actionsMenuAnchor} anchorEl={actionsMenuAnchor} onClose={closeActionsMenu}
      disablePortal={false}>

      <MenuItem>
        <ListItemDecorator><DarkModeIcon /></ListItemDecorator>
        {t('applicationBar.dark')}
        <Switch checked={colorMode === 'dark'} onChange={handleDarkModeToggle} sx={{ ml: 'auto' }} />
      </MenuItem>


      <MenuItem>
        <ListItemDecorator><SettingsSuggestIcon /></ListItemDecorator>
        {t('applicationBar.systemText')}
        <Switch checked={showSystemMessages} onChange={handleSystemMessagesToggle} sx={{ ml: 'auto' }} />
      </MenuItem>

      <MenuItem>
        <ListItemDecorator><SwapVertIcon /></ListItemDecorator>
        {t('applicationBar.freeScroll')}
        <Switch checked={freeScroll} onChange={handleScrollModeToggle} sx={{ ml: 'auto' }} />
      </MenuItem>

      <MenuItem onClick={handleActionShowSettings}>
        <ListItemDecorator><SettingsOutlinedIcon /></ListItemDecorator>
        {t('applicationBar.settings')}
      </MenuItem>

      <ListDivider />

      <MenuItem onClick={handleActionDownloadChatJson}>
        <ListItemDecorator>
          {/*<Badge size='sm' color='danger'>*/}
          <FileDownloadIcon />
          {/*</Badge>*/}
        </ListItemDecorator>
        Download JSON
      </MenuItem>

      <MenuItem onClick={handleActionPublishChat}>
        <ListItemDecorator>
          {/*<Badge size='sm' color='primary'>*/}
          <ExitToAppIcon />
          {/*</Badge>*/}
        </ListItemDecorator>
        {t('applicationBar.shareViaPasteGG')}
      </MenuItem>

      <ListDivider />

      <MenuItem onClick={e => handleActionClearConversation(e, null)}>
        <ListItemDecorator><DeleteOutlineIcon /></ListItemDecorator>
        {t('applicationBar.clearConversation')}
      </MenuItem>
    </Menu>

  </>};