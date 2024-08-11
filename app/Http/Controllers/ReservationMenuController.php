<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationMenuRequest;
use App\Models\Category;
use App\Models\ReservationMenu;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReservationMenuController extends Controller
{
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

    /**
     * Store a newly created resource in storage.
     */
    public function store(ReservationMenuRequest $request)
    {
        if (!empty($request->image)) {
            $row_image = $request->image;
            $detail_image = [
                'path' => 'reservation-menu/', // Remove /public/ as storeAs will handle this.
                'nama_file' => 'menu-' . rand(10, 10000) . '-' . strtotime(date('Y-m-d h:s')) . '.' . $row_image->getClientOriginalExtension(),
            ];

            $row_image->storeAs('public/' . $detail_image['path'], $detail_image['nama_file']);
            $file = $detail_image['path'] . $detail_image['nama_file'];
        }

        ReservationMenu::create([
            'name' => $request->name,
            'description' => $request->description,
            'category_id' => $request->categoryId,
            'limit' => $request->limit,
            'quota' => $request->quota,
            'image' => !empty($request->image) ? $file : null,
        ]);

        return redirect(url('reservation-menu'))->with('message', 'Data Berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $reservationMenu = ReservationMenu::findOrFail($id);

        $file = $reservationMenu->image;

        if ($request->hasFile('image')) {
            // Jika ada gambar baru, hapus gambar lama
            if ($file && file_exists(storage_path('app/public/' . $file))) {
                unlink(storage_path('app/public/' . $file));
            }

            $row_image = $request->file('image');
            $detail_image = [
                'path' => 'reservation-menu/', // Remove /public/ as storeAs will handle this.
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
