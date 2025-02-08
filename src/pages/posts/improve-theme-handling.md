---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'Improving Theme Handling in Next.js with `next-themes`'
pubDate: '2025-02-08'
tags: ['nextjs', 'next-themes']
---

When implementing theme toggling in a Next.js project using `next-themes`, it's essential to ensure that the default theme correctly respects the system preference.

## The Issue with Default Theme Handling

In a typical implementation, developers often derive the theme from cookies and set a default value like this:

```tsx
const appTheme =
  cookieStore.get('appTheme')?.value === 'dark' ? 'dark' : 'light';
```

However, this approach does not account for system preferences when no explicit theme is set. Instead, the default should be `'system'` to respect the user's OS settings.

## Correcting the Default Theme Logic

To ensure the default theme accurately reflects the system preference, modify the logic as follows:

```tsx
const appTheme = cookieStore.get('appTheme')?.value ?? 'system';
```

### Updated Root Component

```tsx
export default async function Root(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const { locale } = params;
  const { children } = props;

  const cookieStore = await cookies();
  const appTheme = cookieStore.get('appTheme')?.value ?? 'system';
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full" data-mode={appTheme}>
      <body
        className={`dark:bg-neutral-950 h-full ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppAbilityProvider>
              <ProvidersForUi locale={locale}>
                <ToastProvider>
                  <ApolloProviderMain>
                    <AnalyticsProvider>
                      <ModalProvider>
                        <DrawerProvider>{children}</DrawerProvider>
                      </ModalProvider>
                    </AnalyticsProvider>
                  </ApolloProviderMain>
                </ToastProvider>
              </ProvidersForUi>
            </AppAbilityProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Benefits of This Approach

- **Default Theme Respects System Preferences**: Ensures users who haven't explicitly set a theme still get an accurate representation of their OS preference.
- **Better Cookie Handling**: Falls back to `'system'` instead of defaulting to `'light'`.
- **Seamless Theme Switching**: The `ThemeProvider` handles dynamic updates automatically.

## Improving the `ThemeToggler` Component

The `ThemeToggler` component enables users to switch between `light`, `dark`, and `system` themes. However, the standard implementation may not reflect the actual applied theme when `system` mode is selected.

### Using `resolvedTheme`

Instead of relying on `theme`, use `resolvedTheme` to determine the actual applied theme:

```tsx
'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

export const ThemeToggler = () => {
  const t = useTranslations('common');
  const { setTheme, resolvedTheme, theme } = useTheme();

  const triggerClassName = cn(
    'flex-1 text-center rounded-[10px] font-medium'
  );

  return (
    <Tabs defaultValue={theme} className="mb-2">
      <TabsList className="flex flex-row w-full gap-1 rounded-[12px] p-0.5 h-auto">
        <TabsTrigger
          className={triggerClassName}
          value="light"
          onClick={() => setTheme('light')}
        >
          {t('nav-item-label-light-mode')}
        </TabsTrigger>
        <TabsTrigger
          className={triggerClassName}
          value="dark"
          onClick={() => setTheme('dark')}
        >
          {t('nav-item-label-dark-mode')}
        </TabsTrigger>
        <TabsTrigger
          className={triggerClassName}
          value="system"
          onClick={() => setTheme('system')}
        >
          {t('nav-item-label-system-mode')}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
```

### Why `resolvedTheme`?

- `theme` returns `'system'` if set, but `resolvedTheme` returns `'light'` or `'dark'` based on the actual applied theme.
- Ensures UI accurately reflects the active theme when following system settings.

## Summary

### Key Fixes Implemented

1. **Default Theme Handling**:
   - Now correctly defaults to `'system'`, allowing OS preferences to dictate the theme.
2. **Using `resolvedTheme` in `ThemeToggler`**:
   - Provides accurate feedback when `system` mode is enabled.
3. **Adding a 'System' Option to `ThemeToggler`**:
   - Allows users to explicitly select system-based theming.

### Benefits

- Ensures a seamless and accurate theme-switching experience.
- Better respects user preferences across devices.
- Improves clarity and maintainability of theme-related code.

By implementing these improvements, your Next.js project will have a more intuitive and reliable theme-switching experience! 🚀
