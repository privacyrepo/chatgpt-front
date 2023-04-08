import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { useTranslation } from 'next-i18next'
import { Box, Button, FormControl, FormHelperText, FormLabel, IconButton, Input, Modal, ModalClose, ModalDialog, ModalOverflow, Radio, RadioGroup,Slider, Stack, Switch, Typography } from '@mui/joy';
import KeyIcon from '@mui/icons-material/Key';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import WidthWideIcon from '@mui/icons-material/WidthWide';

import { Link } from '@/components/util/Link';
import { useSettingsStore } from '@/lib/store-settings';


export const isValidOpenAIApiKey = (apiKey?: string) =>
  !!apiKey && apiKey.startsWith('sk-') && apiKey.length > 40;


export function Section(props: { title?: string; collapsible?: boolean, collapsed?: boolean, disclaimer?: string, children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(props.collapsed ?? false);

  return <>

    <Stack direction='row' sx={{ mt: (props.title ? 1 : 0), alignItems: 'center' }}>
      {!!props.title && (
        <FormLabel>
          {props.title}
        </FormLabel>
      )}
      {!!props.collapsible && (
        <IconButton size='sm' variant='plain' color='neutral' onClick={() => setCollapsed(!collapsed)}>
          {!collapsed ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      )}
    </Stack>

    {!collapsed && <Box sx={{ mt: 1.5, mb: 1.5 }}>
      {props.children}
    </Box>}

    {!!props.disclaimer && (
      <FormHelperText>
        {props.disclaimer}
      </FormHelperText>
    )}

  </>;
}

/**
 * Component that allows the User to modify the application settings,
 * persisted on the client via localStorage.
 *
 * @param {boolean} open Whether the Settings modal is open
 * @param {() => void} onClose Call this to close the dialog from outside
 */
export function SettingsModal({ open, onClose }: { open: boolean, onClose: () => void; }) {
  // external state
  const { centerMode, setCenterMode, renderMarkdown, setRenderMarkdown, zenMode, setZenMode, apiKey, setApiKey, modelTemperature, setModelTemperature, modelMaxResponseTokens, setModelMaxResponseTokens, modelApiHost, setModelApiHost } = useSettingsStore(state => ({
    centerMode: state.centerMode, setCenterMode: state.setCenterMode,
    renderMarkdown: state.renderMarkdown, setRenderMarkdown: state.setRenderMarkdown,
    zenMode: state.zenMode, setZenMode: state.setZenMode,
    apiKey: state.apiKey, setApiKey: state.setApiKey,
    modelTemperature: state.modelTemperature, setModelTemperature: state.setModelTemperature,
    modelMaxResponseTokens: state.modelMaxResponseTokens, setModelMaxResponseTokens: state.setModelMaxResponseTokens,
    modelApiHost: state.modelApiHost, setModelApiHost: state.setModelApiHost,
  }), shallow);
  
  const { t } = useTranslation('common')

  const handleApiKeyChange = (e: React.ChangeEvent) => setApiKey((e.target as HTMLInputElement).value);

  const handleApiKeyDown = (e: React.KeyboardEvent) => (e.key === 'Enter') && onClose();

  const handleCenterModeChange = (event: React.ChangeEvent<HTMLInputElement>) => setCenterMode(event.target.value as 'narrow' | 'wide' | 'full' || 'wide');

  const handleRenderMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => setRenderMarkdown(event.target.checked);

  const handleZenModeChange = (event: React.ChangeEvent<HTMLInputElement>) => setZenMode(event.target.value as 'clean' | 'cleaner');

  const handleTemperatureChange = (event: Event, newValue: number | number[]) => setModelTemperature(newValue as number);

  const handleMaxTokensChange = (event: Event, newValue: number | number[]) => setModelMaxResponseTokens(newValue as number);

  const handleModelApiHostChange = (e: React.ChangeEvent) => setModelApiHost((e.target as HTMLInputElement).value);

  const needsApiKey = !!process.env.REQUIRE_USER_API_KEYS;
  const isValidKey = isValidOpenAIApiKey(apiKey);

  const hideOnMobile = { display: { xs: 'none', md: 'flex' } };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalOverflow><ModalDialog sx={{ maxWidth: 500, display: 'flex', p: { xs: 1, sm: 2, lg: '20px' } }}>
        <ModalClose />

        <Typography level='h5' sx={{ mb: 2 }}>{t('settingsModal.settings')}</Typography>


        <Section>

          <FormControl>
            <FormLabel>
            {t('settingsModal.openaiApiKey')} {needsApiKey ? '' : '(optional)'}
            </FormLabel>
            <Input
              variant='outlined' type='password' placeholder={needsApiKey ? 'required' : 'sk-...'} error={needsApiKey && !isValidKey}
              value={apiKey} onChange={handleApiKeyChange} onKeyDown={handleApiKeyDown}
              startDecorator={<KeyIcon />}
            />
            <FormHelperText sx={{ display: 'block', lineHeight: 1.75 }}>
              {needsApiKey
                ? <><Link level='body2' href='https://platform.openai.com/account/api-keys' target='_blank'>{t('settingsModal.createKey')}</Link>, {t('settingsModal.applyTo')} <Link level='body2' href='https://openai.com/waitlist/gpt-4-api' target='_blank'>{t('settingsModal.waitlist')}</Link></>
                : `${t('settingsModal.keyPrecedence')}`} <Link level='body2' href='https://platform.openai.com/account/usage' target='_blank'>{t('settingsModal.checkUsage')}</Link>.
            </FormHelperText>
          </FormControl>

        </Section>


        <Section>
          <Stack direction='column' sx={{ gap: 3, maxWidth: 400 }}>

            <FormControl orientation='horizontal' sx={{ ...hideOnMobile, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <FormLabel>{t('settingsModal.centering')}</FormLabel>
                <FormHelperText>{centerMode === 'full' ? 'Full screen' : centerMode === 'narrow' ? 'Narrow' : 'Wide'} chat</FormHelperText>
              </Box>
              <RadioGroup orientation='horizontal' value={centerMode} onChange={handleCenterModeChange}>
                <Radio value='narrow' label={<WidthNormalIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
                <Radio value='wide' label={<WidthWideIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
                <Radio value='full' label='Full' />
              </RadioGroup>
            </FormControl>

            <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <FormLabel>{t('settingsModal.visualClutter')}</FormLabel>
                <FormHelperText>{zenMode === 'clean' ? `${t('settingsModal.showSenders')}` : `${t('settingsModal.hideSenderAndMenu')}`}</FormHelperText>
              </Box>
              <RadioGroup orientation='horizontal' value={zenMode} onChange={handleZenModeChange}>
                {/*<Radio value='clean' label={<Face6Icon sx={{ width: 24, height: 24, mt: -0.25 }} />} />*/}
                <Radio value='clean' label='Clean' />
                <Radio value='cleaner' label='Empty' />
              </RadioGroup>
            </FormControl>

            <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
              <Box>
                <FormLabel>{t('settingsModal.markdown')}</FormLabel>
                <FormHelperText>{renderMarkdown ? t('settingsModal.bestLooks') : t('settingsModal.rawText')}</FormHelperText>
              </Box>
              <Switch checked={renderMarkdown} onChange={handleRenderMarkdownChange}
                      endDecorator={renderMarkdown ? 'On' : 'Off'}
                      slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
            </FormControl>

          </Stack>
        </Section>


        {/* Advanced Settings */}

        <Section title={t('settingsModal.advancedAISettings')!} collapsible collapsed={true} disclaimer={t('settingsModal.disclaimer')!}>
          <Stack direction='column' sx={{ gap: 3, mt: -0.8, maxWidth: 400 }}>

            <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ minWidth: 120 }}>
                <FormLabel>{t('settingsModal.temperature')}</FormLabel>
                <FormHelperText>{modelTemperature < 0.33 ? 'More strict' : modelTemperature > 0.67 ? 'Larger freedom' : 'Creativity'}</FormHelperText>
              </Box>
              <Slider
                aria-label='Model Temperature' color='neutral'
                min={0} max={1} step={0.1} defaultValue={0.5}
                value={modelTemperature} onChange={handleTemperatureChange}
                valueLabelDisplay='auto'
                sx={{ py: 1, mt: 1.1 }}
              />
            </FormControl>

            <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ minWidth: 120 }}>
                <FormLabel>{t('settingsModal.maxTokens')}</FormLabel>
                <FormHelperText>{t('settingsModal.responseLength')}</FormHelperText>
              </Box>
              <Slider
                aria-label='Model Max Tokens' color='neutral'
                min={256} max={4096} step={256} defaultValue={1024}
                value={modelMaxResponseTokens} onChange={handleMaxTokensChange}
                valueLabelDisplay='auto'
                sx={{ py: 1, mt: 1.1 }}
              />
            </FormControl>

            <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ minWidth: 120 }}>
                <FormLabel>
                {t('settingsModal.apiHost')}
                  {/*<Tooltip title='Change API host for compatibility with services like Helicone' variant='solid'>*/}
                  {/*  <InfoIcon sx={{ ml: 1, cursor: 'pointer' }} />*/}
                  {/*</Tooltip>*/}
                </FormLabel>
                <FormHelperText sx={{ display: 'block' }}>
                  For <Link level='body2' href='https://www.helicone.ai' target='_blank'>Helicone</Link>
                </FormHelperText>
              </Box>
              <Input
                variant='outlined' placeholder='api.openai.com'
                value={modelApiHost} onChange={handleModelApiHostChange}
                sx={{ flexGrow: 1 }}
              />
            </FormControl>

          </Stack>
        </Section>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='solid' color={isValidKey ? 'primary' : 'neutral'} onClick={onClose}>
          {t('settingsModal.close')}
          </Button>
        </Box>

      </ModalDialog></ModalOverflow>
    </Modal>
  );
}