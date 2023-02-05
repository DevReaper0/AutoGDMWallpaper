echo "$PWD"
cd "${0%/*}"
echo "$PWD"
path="$(gsettings get org.gnome.desktop.background picture-uri)"
echo "$(gsettings get org.gnome.desktop.interface color-scheme)"
if [ "$(gsettings get org.gnome.desktop.interface color-scheme)" == "'prefer-dark'" ]; then
  path="$(gsettings get org.gnome.desktop.background picture-uri-dark)"
fi
echo "$path"
path="${path:8:-1}"
echo "$path"
new_path="$(basename $path)"
echo "$new_path"
new_path="${new_path%.*}.jpg"
echo "$new_path"
new_path="$PWD/$new_path"
echo "$new_path"
magick "$path" "$new_path"
if [ -f "arch-change-gdm-background" ]; then
  rm arch-change-gdm-background
fi
wget github.com/anirudhgupta109/arch-change-gdm-background/raw/master/arch-change-gdm-background
chmod +x arch-change-gdm-background
yes n | pkexec ./arch-change-gdm-background $new_path
#gdm-auto-blur -i "$path" -br 0.5 -b 20 #-p
