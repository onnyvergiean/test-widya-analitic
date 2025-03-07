PGDMP                          |            widya-analitic    15.2    15.2     
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    28055    widya-analitic    DATABASE     �   CREATE DATABASE "widya-analitic" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Indonesia.1252';
     DROP DATABASE "widya-analitic";
                postgres    false            N           1247    28088    gen    TYPE     E   CREATE TYPE public.gen AS ENUM (
    'laki-laki',
    'perempuan'
);
    DROP TYPE public.gen;
       public          postgres    false            �            1259    28068    products    TABLE     �   CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    user_id integer
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    28067    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    217                       0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    216            �            1259    28057    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    gender public.gen NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    846            �            1259    28056    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215                       0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            n           2604    28071    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            m           2604    28060    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215                      0    28068    products 
   TABLE DATA           I   COPY public.products (id, name, description, price, user_id) FROM stdin;
    public          postgres    false    217   �                 0    28057    users 
   TABLE DATA           B   COPY public.users (id, name, email, password, gender) FROM stdin;
    public          postgres    false    215   �                  0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 53, true);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 6, true);
          public          postgres    false    214            t           2606    28075    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    217            p           2606    28066    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            r           2606    28064    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            u           2606    28076    products products_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.products DROP CONSTRAINT products_user_id_fkey;
       public          postgres    false    3186    215    217               �   x�M���0D��+�UJ�L00 &�����Av���$�ӝ��p�v�q�p��qCw��Z^p&!޶�.��a�ڍ���H�3$b�k� BV�@�`fH�x�A���D�P �X��	"���~��_�(i������q4���j*>         s  x�m�Ko�@�3|��vT�[k}ª�/$M�]a�]���/�dB��?s��MF�LvK^&K���o�F����J7��p��Q�U,�E��/dUbI����W�Q�v��ď���:J�S;��zd�Z_���En��f��[�T�5Y�>6k��e����;�8N1�J�~Q����k�¶�˶��fY� w�_�Z�M8q��~��,=Sہ'e�VԶ�E��[�*(��(��&����x��wf�g�հ�eG/�A�>=l(m�e���A�M�V6�e5Φ��8���@6t���,�=��M� �}���|/��h@�MbQS�ܿ]��4�PO$�쮫�0,|�4-tv?@��~���x'��:|��Ȳ�ѹ�     