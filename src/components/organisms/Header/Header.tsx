'use client';

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Settings as SettingsIcon, ShoppingCart, Globe } from 'lucide-react';
import Link from 'next/link';
import styled from 'styled-components';
import { useCart } from '@/contexts/CartContext';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.headerBg};
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #007bff;
  }
`;

const CartButtonContainer = styled.div`
  position: relative;
`;

const SettingsWrapper = styled.div`
  position: relative;
`;

const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: inherit;
`;

const SettingsDropdown = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 8px ${({ theme }) => theme.colors.shadow};
  border-radius: 0.25rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
  z-index: 1000;
`;

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const toggleMenu = () => setMenuOpen((o) => !o);

  const changeLanguage = (newLocale: 'en' | 'tr') => {
    
    setMenuOpen(false);
    
    const segments = pathname.split('/');

    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">
          <Typography variant="h4" color={theme === 'light' ? 'dark' : 'light'} weight="bold">
            {t('my_store')}
          </Typography>
        </Logo>
        <Nav>
          <NavLink href="/">
            <Typography variant="body1" suppressHydrationWarning color={theme === 'light' ? 'dark' : 'light'} weight="medium">
              {t('products')}
            </Typography>
          </NavLink>
          <CartButtonContainer>
            <Button variant="primary" suppressHydrationWarning onClick={() => window.location.href = '/cart'} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <ShoppingCart size={16} />
              {t('cart')}
            </Button>
            {mounted && totalItems > 0 && (
              <Badge variant="danger" position="top-right">
                {totalItems}
              </Badge>
            )}
          </CartButtonContainer>
          <SettingsWrapper>
            <SettingsButton onClick={toggleMenu} aria-label={t('settings')}><SettingsIcon size={20} /></SettingsButton>
            {menuOpen && (
              <SettingsDropdown>
                <Button variant="secondary" onClick={toggleTheme} style={{ width: '100%' }}>
                  {theme === 'light' ? <><Moon size={14} style={{marginRight:4}}/> {t('dark_mode')}</> : <><Sun size={14} style={{marginRight:4}}/> {t('light_mode')}</>}
                </Button>
                <Button variant="secondary" onClick={() => changeLanguage(locale === 'en' ? 'tr' : 'en')} style={{ width: '100%' }}>
                  <Globe size={14} style={{marginRight:4}}/>
                  {locale === 'en' ? 'Türkçe' : 'English'}
                </Button>
              </SettingsDropdown>
            )}
          </SettingsWrapper>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
}
