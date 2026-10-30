'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { whatsappHref } from '../seo';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'c89bffae-8713-46fc-97c8-3efc2053e404';
const MESSAGE_MAX = 1000;
const NAME_MAX = 120;
const CONTACT_MAX = 120;
const WHATSAPP_DISPLAY = '0821-1309-2518';

type FieldName = 'name' | 'contact' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error';

type ArticleQuestionFormProps = {
  articleTitle: string;
  articleUrl: string;
};

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
}

function validate(name: string, contact: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  const trimmedName = name.trim();
  const trimmedContact = contact.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName) {
    errors.name = 'Nama wajib diisi.';
  } else if (trimmedName.length > NAME_MAX) {
    errors.name = `Nama maksimal ${NAME_MAX} karakter.`;
  }

  if (!trimmedContact) {
    errors.contact = 'Email atau nomor WhatsApp wajib diisi.';
  } else if (trimmedContact.length > CONTACT_MAX) {
    errors.contact = `Kontak maksimal ${CONTACT_MAX} karakter.`;
  } else if (trimmedContact.includes('@')) {
    if (!isEmail(trimmedContact)) {
      errors.contact = 'Masukkan email yang valid, atau nomor WhatsApp.';
    }
  } else if (!isPhone(trimmedContact)) {
    errors.contact = 'Masukkan email atau nomor WhatsApp yang valid.';
  }

  if (!trimmedMessage) {
    errors.message = 'Pertanyaan wajib diisi.';
  } else if (trimmedMessage.length > MESSAGE_MAX) {
    errors.message = `Pertanyaan maksimal ${MESSAGE_MAX} karakter.`;
  }

  return errors;
}

function currentPageUrl(fallback: string): string {
  if (typeof window === 'undefined') return fallback;
  return `${window.location.origin}${window.location.pathname}`;
}

export default function ArticleQuestionForm({ articleTitle, articleUrl }: ArticleQuestionFormProps) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const sending = useRef(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const botcheckRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const whatsappFallback = whatsappHref(
    `Halo Mebel Putri Jaya, saya punya pertanyaan dari artikel: ${articleTitle}`,
  );

  useEffect(() => {
    if (status === 'success' && detailsRef.current) {
      detailsRef.current.open = true;
    }
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === 'submitting' || status === 'success') return;

    const errors = validate(name, contact, message);
    setFieldErrors(errors);
    setStatus('idle');
    if (Object.keys(errors).length > 0) {
      const focusTarget = errors.name ? nameRef : errors.contact ? contactRef : messageRef;
      focusTarget.current?.focus();
      return;
    }

    sending.current = true;
    setStatus('submitting');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Pertanyaan baru dari artikel: ${articleTitle}`,
          from_name: 'Website Mebel Putri Jaya',
          name: name.trim(),
          contact: contact.trim(),
          message: message.trim(),
          article_title: articleTitle,
          article_url: currentPageUrl(articleUrl),
          botcheck: botcheckRef.current?.checked === true,
        }),
      });

      const data = (await response.json().catch(() => null)) as { success?: unknown } | null;
      if (data?.success !== true) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setName('');
      setContact('');
      setMessage('');
      setFieldErrors({});
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <section aria-labelledby="pertanyaan-lain" className="mt-16 border-t border-accent pt-12">
      <details
        ref={detailsRef}
        className="article-question w-full shadow-md"
        onToggle={(event) => {
          if (status === 'success' && !event.currentTarget.open) {
            event.currentTarget.open = true;
          }
        }}
      >
        <summary className="flex w-full cursor-pointer items-center gap-3 bg-primary px-5 py-4 text-left text-white transition-colors hover:bg-[#338f8c] focus-visible:bg-[#338f8c] sm:px-6">
          <MessageCircle className="shrink-0" size={20} aria-hidden="true" />
          <h2 id="pertanyaan-lain" className="flex-1 text-xl font-bold text-white">
            Punya pertanyaan lain?
          </h2>
          <ChevronDown className="article-question-chevron shrink-0 text-white" size={22} aria-hidden="true" />
        </summary>

        <div className="rounded-b-xl border border-t-0 border-accent bg-white px-6 py-6 sm:px-8">
          {status === 'success' ? (
            <p
              role="status"
              className="rounded-2xl border border-primary/30 bg-primary/10 px-5 py-4 text-lg text-gray-800"
            >
              Terima kasih, pertanyaan Anda sudah terkirim.
            </p>
          ) : (
            <>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                Tulis pertanyaan Anda, kami balas lewat email atau WhatsApp.
              </p>
              <form
          onSubmit={handleSubmit}
          noValidate
          className="relative flex flex-col gap-5"
          aria-busy={status === 'submitting'}
        >
          <div style={{ display: 'none' }} aria-hidden="true">
            <label htmlFor="article-question-botcheck">Jangan diisi</label>
            <input
              ref={botcheckRef}
              id="article-question-botcheck"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              defaultChecked={false}
              style={{ display: 'none' }}
            />
          </div>

          <div>
            <label htmlFor="article-question-name" className="mb-1 block text-sm font-medium text-gray-700">
              Nama
            </label>
            <input
              ref={nameRef}
              id="article-question-name"
              name="name"
              type="text"
              required
              maxLength={NAME_MAX}
              autoComplete="name"
              value={name}
              disabled={status === 'submitting'}
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? 'article-question-name-error' : undefined}
              onChange={(event) => {
                setName(event.target.value);
                if (fieldErrors.name) setFieldErrors((current) => ({ ...current, name: undefined }));
              }}
              className="w-full rounded-xl border border-accent bg-white px-4 py-3 text-gray-800 transition-colors focus:border-primary focus:outline-none disabled:opacity-60"
            />
            {fieldErrors.name ? (
              <p id="article-question-name-error" className="mt-1 text-sm text-danger">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="article-question-contact" className="mb-1 block text-sm font-medium text-gray-700">
              Email atau No. WhatsApp
            </label>
            <input
              ref={contactRef}
              id="article-question-contact"
              name="contact"
              type="text"
              required
              inputMode="email"
              autoComplete="email"
              maxLength={CONTACT_MAX}
              value={contact}
              disabled={status === 'submitting'}
              aria-invalid={fieldErrors.contact ? true : undefined}
              aria-describedby={fieldErrors.contact ? 'article-question-contact-error' : undefined}
              onChange={(event) => {
                setContact(event.target.value);
                if (fieldErrors.contact) setFieldErrors((current) => ({ ...current, contact: undefined }));
              }}
              className="w-full rounded-xl border border-accent bg-white px-4 py-3 text-gray-800 transition-colors focus:border-primary focus:outline-none disabled:opacity-60"
            />
            {fieldErrors.contact ? (
              <p id="article-question-contact-error" className="mt-1 text-sm text-danger">
                {fieldErrors.contact}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="article-question-message" className="mb-1 block text-sm font-medium text-gray-700">
              Pertanyaan
            </label>
            <textarea
              ref={messageRef}
              id="article-question-message"
              name="message"
              required
              rows={5}
              maxLength={MESSAGE_MAX}
              value={message}
              disabled={status === 'submitting'}
              aria-invalid={fieldErrors.message ? true : undefined}
              aria-describedby={
                fieldErrors.message
                  ? 'article-question-message-error article-question-message-count'
                  : 'article-question-message-count'
              }
              onChange={(event) => {
                setMessage(event.target.value);
                if (fieldErrors.message) setFieldErrors((current) => ({ ...current, message: undefined }));
              }}
              className="w-full resize-y rounded-xl border border-accent bg-white px-4 py-3 text-gray-800 transition-colors focus:border-primary focus:outline-none disabled:opacity-60"
            />
            {fieldErrors.message ? (
              <p id="article-question-message-error" className="mt-1 text-sm text-danger">
                {fieldErrors.message}
              </p>
            ) : null}
            <p id="article-question-message-count" className="mt-1 text-sm text-gray-500">
              {message.length}/{MESSAGE_MAX}
            </p>
          </div>

          {status === 'error' ? (
            <p role="alert" className="text-sm text-danger">
              Pertanyaan belum terkirim. Silakan coba lagi, atau chat WhatsApp{' '}
              <a href={whatsappFallback} target="_blank" rel="noreferrer" className="font-bold underline">
                {WHATSAPP_DISPLAY}
              </a>
              .
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'submitting' ? 'Mengirim...' : 'Kirim'}
          </button>
        </form>
            </>
          )}
        </div>
      </details>
    </section>
  );
}
