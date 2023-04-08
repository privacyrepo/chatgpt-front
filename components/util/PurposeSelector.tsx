import * as React from 'react';

import { Box, Button, Grid, IconButton, Input, Stack, Textarea, Typography, useTheme } from '@mui/joy';
import { Input } from '@mui/material';import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';

import { SystemPurposeId, SystemPurposes } from '@/lib/data';

import { useTranslation } from 'next-i18next';
import { useActiveConfiguration } from '@/lib/store-chats';
import { useSettingsStore } from '@/lib/store-settings';


// Constants for tile sizes / grid width - breakpoints need to be computed here to work around
// the "flex box cannot shrink over wrapped content" issue
//
// Absolutely dislike this workaround, but it's the only way I found to make it work

const bpTileSize = { xs: 116, md: 125, xl: 130 };
const tileCols = [3, 4, 6];
const tileSpacing = 1;
const bpMaxWidth = Object.entries(bpTileSize).reduce((acc, [key, value], index) => {
  acc[key] = tileCols[index] * (value + 8 * tileSpacing) - 8 * tileSpacing;
  return acc;
}, {} as Record<string, number>);
const bpTileGap = { xs: 2, md: 3 };

/**
 * Purpose selector for the current chat. Clicking on any item activates it for the current chat.
 */
export function PurposeSelector() {
  // state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredIDs, setFilteredIDs] = React.useState<SystemPurposeId[] | null>(null);

  // external state
  const theme = useTheme();
  const showPurposeFinder = useSettingsStore(state => state.showPurposeFinder);
  const { systemPurposeId, setSystemPurposeId } = useActiveConfiguration();


  const handleSearchClear = () => {
    setSearchQuery('');
    setFilteredIDs(null);
  };

  const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    if (!query)
      return handleSearchClear();
    setSearchQuery(query);

    // Filter results based on search term
    const ids = Object.keys(SystemPurposes)
      .filter(key => SystemPurposes.hasOwnProperty(key))
      .filter(key => {
        const purpose = SystemPurposes[key as SystemPurposeId];
        return purpose.title.toLowerCase().includes(query.toLowerCase())
          || (typeof purpose.description === 'string' && purpose.description.toLowerCase().includes(query.toLowerCase()));
      });
    setFilteredIDs(ids as SystemPurposeId[]);

    // If there's a search term, activate the first item
    if (ids.length && !ids.includes(systemPurposeId))
      handlePurposeChanged(ids[0] as SystemPurposeId);
  };

  const handleSearchOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key == 'Escape')
      handleSearchClear();
  };


  const handlePurposeChanged = (purpose: SystemPurposeId | null) => {
    if (purpose)
      setSystemPurposeId(purpose);
  };

  const handleCustomSystemMessageChange = (v: React.ChangeEvent<HTMLTextAreaElement>): void => {
    // TODO: persist this change? Right now it's reset every time.
    //       maybe we shall have a "save" button just save on a state to persist between sessions
    SystemPurposes['Custom'].systemMessage = v.target.value;
  };

  // Filter the list of purposes based on the search term and current page
  const filteredSystemPurposes = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return Object.keys(SystemPurposes)
      .filter((spId) => SystemPurposes[spId as SystemPurposeId].title.toLowerCase().includes(lowerCaseSearchTerm))
      .sort((a, b) => SystemPurposes[a as SystemPurposeId].title.localeCompare(SystemPurposes[b as SystemPurposeId].title));
  }, [searchTerm]);

  //calculate total pages based on total filtered purposes
  const totalPages = Math.ceil(filteredSystemPurposes.length / itemsPerPage);
  
  // Calculate the paged list of purposes
  const pagedSystemPurposes = React.useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredSystemPurposes.slice(start, end);
  }, [filteredSystemPurposes, itemsPerPage, page]);

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // we show them all if the filter is clear (null)
  const purposeIDs = (filteredIDs && showPurposeFinder) ? filteredIDs : Object.keys(SystemPurposes);

  return <>

    {showPurposeFinder && <Box sx={{ p: 2 * tileSpacing }}>
      <Input
        fullWidth
        variant='outlined' color='neutral'
        value={searchQuery} onChange={handleSearchOnChange}
        onKeyDown={handleSearchOnKeyDown}
        placeholder='Search for purpose…'
        startDecorator={<SearchIcon />}
        endDecorator={searchQuery && (
          <IconButton variant='plain' color='neutral' onClick={handleSearchClear}>
            <ClearIcon />
          </IconButton>
        )}
        sx={{
          boxShadow: theme.vars.shadow.sm,
        }}
      />
    </Box>}

    <Stack direction='column' sx={{ minHeight: '60vh', justifyContent: 'center', alignItems: 'center' }}>

      <Box sx={{ maxWidth: bpMaxWidth }}>

        <Typography level='body3' color='neutral' sx={{ mb: 2 }}>
          Select an AI purpose
        </Typography>
        <Input placeholder="Search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} sx={{ mt: 2, mb: 4, minWidth: '200px' }} />
        <Grid container spacing={tileSpacing} sx={{ justifyContent: 'flex-start' }}>
          {purposeIDs.map((spId) => (
            <Grid key={spId}>
              <Button
                variant={systemPurposeId === spId ? 'solid' : 'soft'}
                color={systemPurposeId === spId ? 'primary' : 'neutral'}
                onClick={() => handlePurposeChanged(spId as SystemPurposeId)}
                sx={{
                  flexDirection: 'column',
                  fontWeight: 500,
                  gap: bpTileGap,
                  height: bpTileSize,
                  width: bpTileSize,
                  ...(systemPurposeId !== spId ? {
                    boxShadow: theme.vars.shadow.md,
                    background: theme.vars.palette.background.level1,
                  } : {}),
                }}
              >
                <div style={{ fontSize: '2rem' }}>
                  {SystemPurposes[spId as SystemPurposeId]?.symbol}
                </div>
                <div>
                  {SystemPurposes[spId as SystemPurposeId]?.title}
                </div>
              </Button>
            </Grid>
          ))}
        </Grid>

        <Typography level='body2' sx={{ mt: 2 }}>
          {purposeIDs.length > 0 ? SystemPurposes[systemPurposeId]?.description : 'Oops! No AI purposes found for your search.'}
        </Typography>

        {systemPurposeId === 'Custom' && (
          <Textarea
            variant='outlined' autoFocus placeholder={'Craft your custom system message here…'}
            minRows={3}
            defaultValue={SystemPurposes['Custom']?.systemMessage} onChange={handleCustomSystemMessageChange}
            sx={{
              background: theme.vars.palette.background.level1,
              lineHeight: 1.75,
              mt: 1,
            }} />
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Button disabled={page === 1} onClick={handlePreviousPage} sx={{ mr: 1 }}>
              Previous
            </Button>
            <Typography level="body2" sx={{ mr: 1 }}>
              Page {page} of {totalPages}
            </Typography>
            <Button disabled={page === totalPages} onClick={handleNextPage} sx={{ ml: 1 }}>
              Next
            </Button>
          </Box>
        )}

        {/* No results message */}
        {pagedSystemPurposes.length === 0 && (
          <Typography level="body2" sx={{ mt: 2 }}>
            No results found.
          </Typography>
        )}
      </Box>
    </Stack>

  </>;
}
