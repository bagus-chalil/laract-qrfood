<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::search($request->search)->paginate($request->filter ?? 10)->appends('query',null)->withQueryString();

        return Inertia::render('Admin/Category/Index',['category' => $categories,'sessions' => session()->all()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        Category::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect(url('category'))->with('message', 'Data Berhasil ditambahkan !');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        Category::find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect(url('category'))->with('message', 'Data Berhasil diperbarui !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        Category::destroy($request->id);

        return redirect(url('category'))->with('message', 'Data Berhasil dihapus !');
    }
}
