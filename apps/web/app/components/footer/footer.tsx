const navigation = {
  main: [
    { name: "このサイトについて", href: "/about" },
    { name: "校正リクエスト方法", href: "/proofreading_request" },
    { name: "プライバシーポリシー", href: "/privacy" },
    { name: "免責事項", href: "/disclaimer" },
    { name: "お問い合わせ", href: "/contact" },
  ]
};

export function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6hover:text-gray-600">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-xs leading-5">
          &copy; 2025 sori883.
        </p>
      </div>
    </footer>
  );
}