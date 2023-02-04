
// The 'Meeting interface' is derived from a json formated meeting list returned
// from an NA root server, naworks.org, in this case. This is the official NA meeting list
// https://meetings.naworks.org/client_interface/json/?switcher=GetSearchResults&get_used_formats=1&services=18"
// the json data is retrieved and saved in assets/meetings.json file for now.

export interface Meeting {
  id_bigint: string;
  worldid_mixed:string;
  shared_group_id_bigint: string;
  service_body_bigint: string;
  weekday_tinyint: string;
  venue_type: string;
  start_time: string;
  duration_time: string;
  time_zone: string;
  formats: string;
  lang_enum: string;
  longitude: string;
  latitude: string;
  distance_in_km: string;
  distance_in_miles: string;
  email_contact: string;
  meeting_name: string;
  location_text: string;
  location_info:  string;
  location_street: string;
  location_city_subsection: string;
  location_neighborhood: string;
  location_municipality: string;
  location_sub_province: string;
  location_province: string;
  location_postal_code_1: string;
  location_nation: string;
  comments: string;
  train_lines: string;
  bus_lines: string;
  contact_phone_2: string;
  contact_email_2: string;
  contact_name_2: string;
  contact_phone_1: string;
  contact_email_1: string;
  contact_name_1: string;
  virtual_meeting_additional_info: string;
  phone_meeting_number: string;
  virtual_meeting_link: string;
  published: string;
  root_server_uri: string;
  format_shared_id_list: string;
}

export interface formats {
  key_string: string;
  name_string: string;
  description_string: string;
  lang: string;
  id: string;
  world_id: string;
  root_server_uri: string;
  format_type_enum: string;
}
