#!/bin/bash

# BGM音楽ファイル設置スクリプト
# このスクリプトは、著作権フリーの音楽ファイルをダウンロードして配置するためのサンプルです。

echo "BGM音楽ファイルの設置について"
echo "================================"
echo ""
echo "1. 著作権フリーの音楽サイトから楽曲をダウンロード:"
echo "   - Pixabay Music: https://pixabay.com/music/"
echo "   - Freesound: https://freesound.org/"
echo "   - YouTube Audio Library"
echo "   - Incompetech: https://incompetech.com/"
echo ""
echo "2. 推奨ファイル形式: MP3 (互換性が高い)"
echo "3. ファイル名: bgm-main.mp3"
echo "4. 配置場所: ./audio/bgm-main.mp3"
echo ""
echo "注意: 必ず著作権フリーまたは適切なライセンスの楽曲を使用してください。"
echo ""

# ファイルの存在確認
if [ -f "./audio/bgm-main.mp3" ]; then
    echo "✅ BGM file found: bgm-main.mp3"
else
    echo "❌ BGM file not found. Please add bgm-main.mp3 to the audio folder."
    echo ""
    echo "サンプル wget コマンド (著作権フリー音楽の例):"
    echo "# wget -O ./audio/bgm-main.mp3 'YOUR_COPYRIGHT_FREE_MUSIC_URL'"
fi

echo ""
echo "セットアップ完了後、index.html をブラウザで開いてBGMプレイヤーをテストしてください。"
