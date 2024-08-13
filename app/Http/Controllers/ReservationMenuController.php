<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\ReservationMenu;
use App\Helper\GenerateNumberController;
use Illuminate\Database\Eloquent\Builder;
use App\Http\Requests\ReservationMenuRequest;

class ReservationMenuController extends Controller
{
    public function __construct()
    {
        $this->code = new GenerateNumberController;
    }
    public function index(Request $request)
    {
        $reservationMenu = ReservationMenu::search($request->search)
                                        ->query(fn (Builder $query) => $query->with('category'))
                                        ->paginate($request->filter ?? 10)
                                        ->appends('query',null)->withQueryString();

        $category = Category::all();

        return Inertia::render('Admin/ReservationMenu/ReservationMenu',[
            'reservationMenu' => $reservationMenu,
            'category' => $category,
            'sessions' => session()->all()
        ]);
    }

    public function show(Request $request)
    {
        $reservationMenu = ReservationMenu::search($request->search)
                                        ->query(fn (Builder $query) => $query->with('category'))
                                        ->paginate($request->filter ?? 10)
                                        ->appends('query',null)->withQueryString();

        $category = Category::all();

        return Inertia::render('Admin/ReservationMenu/AddReservationMenu',[
            'reservationMenu' => $reservationMenu,
            'category' => $category,
            'sessions' => session()->all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationMenuRequest $request)
    {
        if (!empty($request->image)) {
            $row_image = $request->image;
            $originalImagePath = $row_image->getPathname();
            $originalImageExtension = $row_image->getClientOriginalExtension();

            // Tentukan ukuran gambar yang diinginkan
            $newWidth = 600;
            $newHeight = 400;

            // Buat nama file yang akan disimpan
            $detail_image = [
                'path' => 'reservation-menu/',
                'nama_file' => 'menu-' . rand(10, 10000) . '-' . strtotime(date('Y-m-d h:s')) . '.' . $originalImageExtension,
            ];

            // Load gambar asli
            switch ($originalImageExtension) {
                case 'jpeg':
                case 'jpg':
                    $imageResource = imagecreatefromjpeg($originalImagePath);
                    break;
                case 'PNG':
                case 'png':
                    $imageResource = imagecreatefrompng($originalImagePath);
                    break;
                case 'gif':
                    $imageResource = imagecreatefromgif($originalImagePath);
                    break;
                default:
                    throw new \Exception('Unsupported image type');
            }

            // Mendapatkan dimensi asli gambar
            $originalWidth = imagesx($imageResource);
            $originalHeight = imagesy($imageResource);

            // Membuat gambar baru dengan ukuran yang diinginkan
            $newImageResource = imagecreatetruecolor($newWidth, $newHeight);

            // Mengubah ukuran gambar
            imagecopyresampled($newImageResource, $imageResource, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);

            // Simpan gambar baru
            $uploadPath = storage_path('app/public/' . $detail_image['path']);
            if (!file_exists($uploadPath)) {
                mkdir($uploadPath, 0777, true);
            }

            switch ($originalImageExtension) {
                case 'jpeg':
                case 'jpg':
                    imagejpeg($newImageResource, $uploadPath . $detail_image['nama_file']);
                    break;
                case 'PNG':
                case 'png':
                    imagepng($newImageResource, $uploadPath . $detail_image['nama_file']);
                    break;
                case 'gif':
                    imagegif($newImageResource, $uploadPath . $detail_image['nama_file']);
                    break;
            }

            // Membersihkan memori
            imagedestroy($imageResource);
            imagedestroy($newImageResource);

            // Path gambar yang telah diubah ukurannya
            $file = $detail_image['path'] . $detail_image['nama_file'];
        } else {
            $file = null;
        }

        ReservationMenu::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->categoryId,
            'limit' => $request->limit,
            'quota' => $request->quota,
            'image' => $file,
            'reservation_menu_code' => $this->code->generateRandomString(),
        ]);

        return redirect(url('reservation-menu'))->with('alert', [
            'type' => 'success',
            'message' => 'Data Berhasil ditambahkan!',
        ]);
    }

    public function edit($id)
    {
        $reservationMenu = ReservationMenu::findOrFail($id);

        $category = Category::all();

        return Inertia::render('Admin/ReservationMenu/EditReservationMenu',[
            'reservationMenu' => $reservationMenu,
            'category' => $category,
            'sessions' => session()->all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $reservationMenu = ReservationMenu::findOrFail($id);

        $file = $reservationMenu->image;

        if ($request->hasFile('image')) {
            if ($file && file_exists(storage_path('app/public/' . $file))) {
                unlink(storage_path('app/public/' . $file));
            }

            $row_image = $request->file('image');
            $detail_image = [
                'path' => 'reservation-menu/',
                'nama_file' => 'menu-' . rand(10, 10000) . '-' . strtotime(date('Y-m-d h:s')) . '.' . $row_image->getClientOriginalExtension(),
            ];

            $row_image->storeAs('public/' . $detail_image['path'], $detail_image['nama_file']);
            $file = $detail_image['path'] . $detail_image['nama_file'];
        }

        $reservationMenu->update([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->categoryId,
            'limit' => $request->limit,
            'quota' => $request->quota,
            'image' => $file,
        ]);

        return redirect(url('reservation-menu'))->with('message', 'Data Berhasil diperbarui!');
    }

    public function destroy(Request $request)
    {
        ReservationMenu::destroy($request->id);

        return redirect(url('reservation-menu'))->with('message', 'Data Berhasil dihapus!');
    }
}
