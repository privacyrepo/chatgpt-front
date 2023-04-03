import * as React from 'react';

import { AspectRatio, Box, Button, Grid, Stack, Textarea, Typography, useTheme } from '@mui/joy';
import { Input, InputAdornment } from '@mui/material';

import { useActiveConfiguration } from '@/lib/store-chats';
import { SystemPurposeId, SystemPurposes } from '@/lib/data';

/**
 * Purpose selector for the current chat. Clicking on any item activates it for the current chat.
 */
export function PurposeSelector() {
  // external state
  const theme = useTheme();
  const { setSystemPurposeId, systemPurposeId } = useActiveConfiguration();
  const [searchTerm, setSearchTerm] = React.useState('');
  const handlePurposeChange = (purpose: SystemPurposeId | null) => {
    if (purpose) setSystemPurposeId(purpose);
  };

  const handleCustomSystemMessageChange = (v: React.ChangeEvent<HTMLTextAreaElement>): void => {
    // TODO: persist this change? Right now it's reset every time.
    //       maybe we shall have a "save" button just save on a state to persist between sessions
    SystemPurposes['Custom'].systemMessage = v.target.value;
  };

  // Filter the list of purposes based on the search term
  const filteredSystemPurposes = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Object.keys(SystemPurposes).filter((spId) => SystemPurposes[spId as SystemPurposeId].title.toLowerCase().includes(lowerCaseSearchTerm));
  }, [searchTerm]);

  return (
    <Stack direction="column" sx={{ justifyContent: 'center', alignItems: 'center', mx: 2, minHeight: '60vh' }}>
      <Box>
        <Typography level="body3" color="neutral" sx={{ mb: 2 }}>
          AI purpose
        </Typography>

        {/* Add a search bar to filter the list of purposes */}
        <Input placeholder="Search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} sx={{ mt: 2, mb: 4, minWidth: '200px' }} />

        <Grid container spacing={1}>
          {filteredSystemPurposes.map((spId) => (
            <Grid key={spId} xs={4} lg={3} xl={2} sx={{ minWidth: '200px' }}>
              <AspectRatio
                variant="plain"
                ratio={1}
                sx={{
                  minWidth: { xs: 56, lg: 78, xl: 130 },
                  maxWidth: 150,
                  background: 'transparent',
                  // borderRadius: 8,
                  // boxShadow: theme.vars.shadow.md,
                }}
              >
                <Button
                  variant={systemPurposeId === spId ? 'solid' : 'soft'}
                  color={systemPurposeId === spId ? 'primary' : 'neutral'}
                  onClick={() => handlePurposeChange(spId as SystemPurposeId)}
                  sx={{
                    flexDirection: 'column',
                    gap: { xs: 2, lg: 3 },
                    /*fontFamily: theme.vars.fontFamily.code,*/
                    fontWeight: 500,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2rem' }}>{SystemPurposes[spId as SystemPurposeId]?.symbol}</div>

                  <div>{SystemPurposes[spId as SystemPurposeId]?.title}</div>
                </Button>
              </AspectRatio>
            </Grid>
          ))}
        </Grid>

        <Typography level="body2" sx={{ mt: 2 }}>
          {SystemPurposes[systemPurposeId].description}
        </Typography>

        {systemPurposeId === 'Custom' && (
          <>
            <Textarea
              variant="soft"
              autoFocus
              placeholder={'Enter your custom system message here...'}
              minRows={3}
              defaultValue={SystemPurposes['Custom'].systemMessage}
              onChange={handleCustomSystemMessageChange}
              sx={{
                mt: 1,
                fontSize: '16px',
                lineHeight: 1.75,
              }}
            />
          </>
        )}
      </Box>
    </Stack>
  );
}
