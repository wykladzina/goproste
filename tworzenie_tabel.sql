create table stany(
  id_stanu serial primary key,
  kiedy_stanu timestamp default current_timestamp,
  id_gry integer,
  stan text
);

CREATE INDEX id_gry_idx ON stany(id_gry);
CREATE INDEX kiedy_stanu_idx ON stany(kiedy_stanu);
