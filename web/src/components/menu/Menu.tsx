import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { useNuiEvent } from '../../hooks/useNuiEvent';
import { fetchNui } from '../../utils/fetchNui';
import { debugData } from '../../utils/debugData';
import { MdClose } from 'react-icons/md';

interface MenuProps {
  title: string;
  items: MenuItemProps[];
}

interface MenuItemProps {
  id: number;
  title: string;
}

debugData([
  {
    action: 'openMenu',
    data: {
      title: 'Garage',
      items: [
        {
          id: 1,
          title: 'Open garage',
        },
        {
          id: 1,
          title: 'Store vehicle',
        },
        {
          id: 1,
          title: 'Store vehicle',
        },
        {
          id: 1,
          title: 'Store vehicle',
        },
        {
          id: 1,
          title: 'Store vehicle',
        },
      ],
    },
  },
]);

const MenuWrapper: React.FC = () => {
  const [menu, setMenu] = useState<MenuProps | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleItemClick = async (item: MenuItemProps) => {
    await fetchNui('onMenuItemClick', item);
  };

  const handleCloseMenu = () => {
    fetchNui('onCloseMenu');
    setMenu(null);
    setIsOpen(false);
  };

  useNuiEvent<MenuProps>('openMenu', data => {
    setMenu(data);
    setIsOpen(true);
  });

  useNuiEvent('closeMenu', () => {
    setMenu(null);
    setIsOpen(false);
  });

  console.log(menu?.title);

  return (
    <Box
      position='absolute'
      h='80vh'
      w='100%'
      justifyContent='center'
      display='flex'
      zIndex={2}
      alignItems='center'
    >
      {isOpen && menu && (
        <>
          <Box
            width={250}
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
          >
            <Box w='inherit' display='flex' flexDirection='row'>
              <Box
                mr={1}
                w='inherit'
                bg='gray.900'
                mb={2}
                borderRadius={5}
                px={5}
                py={2}
              >
                <Text fontWeight={500}>{menu?.title}</Text>
              </Box>
              <Box>
                <IconButton
                  aria-label='menu-close'
                  onClick={handleCloseMenu}
                  bg='gray.900'
                >
                  <MdClose fontSize={24} />
                </IconButton>
              </Box>
            </Box>
            <Box>
              {menu.items &&
                menu.items.map(item => (
                  <Box
                    cursor='pointer'
                    onClick={() => handleItemClick(item)}
                    background='gray.900'
                    w={250}
                    mb={1}
                    borderRadius={5}
                    px={5}
                    py={2}
                  >
                    {item.title}
                  </Box>
                ))}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MenuWrapper;
