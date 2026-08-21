-- Public inbound leads, bookings, and follow-up events.
create table if not exists leads (
  id            text primary key,
  name          text not null,
  email         text not null,
  phone         text not null,
  zip           text not null default '',
  project_type  text not null default 'residential',
  source        text not null default 'website',
  status        text not null default 'new',
  sqft          integer,
  rooms         text not null default '',
  timeline      text not null default '',
  message       text not null default '',
  slot          text not null default '',
  estimate_low  integer,
  estimate_high integer,
  notes         text not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists leads_status_idx on leads (status);
create index if not exists leads_created_at_idx on leads (created_at desc);

create table if not exists lead_events (
  id         text primary key,
  lead_id    text not null references leads (id) on delete cascade,
  kind       text not null,
  detail     text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists lead_events_lead_id_idx on lead_events (lead_id);
